using Structo.Core.DTOs.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IUserService
{
    Task<List<UserDto>> GetAllUsersAsync();
    Task<(bool Success, UserDto? Data, string Message)> CreateUserAsync(UserCreateDto dto, string currentUserRole);
}
