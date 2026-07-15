using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Users;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Controllers
{
    [ApiController]
    [Route("api/employees")]
    [Authorize]
    public class EmployeeManagementController : ControllerBase
    {
        private readonly StructoDbContext _context;
        private readonly ITenantContextAccessor _tenantAccessor;

        public EmployeeManagementController(StructoDbContext context, ITenantContextAccessor tenantAccessor)
        {
            _context = context;
            _tenantAccessor = tenantAccessor;
        }

        private string CurrentUserRole => User.FindFirstValue("role") ?? User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

        [HttpPost]
        [Authorize(Roles = "TenantOwner,SuperAdmin")]
        public async Task<ActionResult<ApiResponse<UserDto>>> AddEmployee([FromBody] UserCreateDto dto)
        {
            if (dto == null)
            {
                return BadRequest(new ApiResponse<UserDto>
                {
                    Success = false,
                    Message = "Invalid employee request data."
                });
            }

            var emailNormalized = dto.Email.Trim().ToLower();
            var exists = await _context.Users.IgnoreQueryFilters().AnyAsync(u => u.Email == emailNormalized);
            if (exists)
            {
                return BadRequest(new ApiResponse<UserDto>
                {
                    Success = false,
                    Message = "Email is already registered"
                });
            }

            // Secure programmatic background password generation for auto-merge flow
            var secureTempPassword = Guid.NewGuid().ToString("N").Substring(0, 16) + "!A1a";
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(secureTempPassword);

            var tenantId = _tenantAccessor.GetCurrentTenantId();

            var employee = new User
            {
                FirstName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.FirstName),
                LastName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.LastName),
                Email = emailNormalized,
                PersonalPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.PersonalPhone),
                WhatsAppPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.WhatsAppPhone),
                PasswordHash = passwordHash,
                Role = dto.Role,
                TenantId = tenantId,
                IsActive = true,
                IsApproved = true // 🔒 Crucial: manually pre-approved
            };

            _context.Users.Add(employee);
            await _context.SaveChangesAsync();

            var resultDto = new UserDto
            {
                Id = employee.Id,
                IsActive = employee.IsActive,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                PersonalPhone = employee.PersonalPhone,
                WhatsAppPhone = employee.WhatsAppPhone,
                Role = employee.Role,
                CreatedAt = employee.CreatedAt
            };

            return Ok(new ApiResponse<UserDto>
            {
                Success = true,
                Message = "Employee pre-registered successfully.",
                Data = resultDto
            });
        }
    }
}
