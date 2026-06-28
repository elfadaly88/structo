using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Users;
using Structo.Core.Interfaces;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController(IUserService userService) : ControllerBase
{
    private string CurrentUserRole => User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<UserDto>>>> GetAll()
    {
        var users = await userService.GetAllUsersAsync();

        return Ok(new ApiResponse<List<UserDto>> { Data = users, CurrentUserRole = CurrentUserRole });
    }

    [HttpPost]
    [Authorize(Roles = "TenantOwner,SuperAdmin")]
    public async Task<ActionResult<ApiResponse<UserDto>>> Create([FromBody] UserCreateDto dto)
    {
        var (success, data, message) = await userService.CreateUserAsync(dto, CurrentUserRole);

        if (!success)
        {
            return BadRequest(new ApiResponse<UserDto> 
            { 
                Success = false, 
                Message = message 
            });
        }

        return Ok(new ApiResponse<UserDto> 
        { 
            Data = data, 
            Message = message, 
            CurrentUserRole = CurrentUserRole 
        });
    }
}
