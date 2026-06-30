using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Photos;
using Structo.Core.Entities;
using Structo.Infrastructure.Data;
using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/projects/{projectId}/[controller]")]
[Authorize(Roles = "SuperAdmin,TenantOwner,Manager,SiteEngineer,DesignEngineer")]
public class SitePhotosController(StructoDbContext context) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpPost]
    public async Task<ActionResult<ApiResponse<bool>>> UploadPhoto([FromRoute] Guid projectId, [FromForm] Models.SitePhotoUploadDto dto)
    {
        if (dto.File == null || dto.File.Length == 0)
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "No file uploaded" });

        var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        Directory.CreateDirectory(uploadFolder);
        
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.File.FileName);
        var filePath = Path.Combine(uploadFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await dto.File.CopyToAsync(stream);
        }

        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Guid.TryParse(userIdString, out var userId);

        var photo = new SitePhoto
        {
            ProjectId = projectId,
            UploadedByUserId = userId, 
            PhotoUrl = $"/uploads/{fileName}",
            Description = dto.Description,
            UploadedAt = DateTime.UtcNow
        };

        context.SitePhotos.Add(photo);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Photo uploaded successfully", CurrentUserRole = CurrentUserRole });
    }

    [HttpGet("mobile")]
    public async Task<ActionResult<ApiResponse<PaginatedList<SitePhotoMobileDto>>>> GetMobilePhotos(
        [FromRoute] Guid projectId, 
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10)
    {
        var query = context.SitePhotos
            .Include(p => p.UploadedByUser)
            .Where(p => p.ProjectId == projectId)
            .OrderByDescending(p => p.UploadedAt);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new SitePhotoMobileDto
            {
                Id = p.Id,
                PhotoUrl = p.PhotoUrl,
                Description = p.Description,
                UploadedAt = p.UploadedAt,
                UploadedBy = p.UploadedByUser != null ? p.UploadedByUser.FirstName + " " + p.UploadedByUser.LastName : string.Empty
            })
            .ToListAsync();

        var paginatedList = new PaginatedList<SitePhotoMobileDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        return Ok(new ApiResponse<PaginatedList<SitePhotoMobileDto>>
        {
            Data = paginatedList,
            CurrentUserRole = CurrentUserRole
        });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<bool>>> DeletePhoto([FromRoute] Guid projectId, [FromRoute] Guid id)
    {
        var photo = await context.SitePhotos.FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);
        if (photo == null)
            return NotFound(new ApiResponse<bool> { Success = false, Message = "Photo not found" });

        context.SitePhotos.Remove(photo);
        await context.SaveChangesAsync();

        return Ok(new ApiResponse<bool> { Data = true, Message = "Photo deleted successfully", CurrentUserRole = CurrentUserRole });
    }
}

