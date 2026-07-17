using Structo.Core.DTOs.Auth;
using System;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IAuthService
{
    Task<(bool Success, LoginResponseDto? Data, string Message)> LoginAsync(LoginDto dto);
    Task<(bool Success, Guid? TenantId, string Message)> RegisterTenantAsync(TenantRegisterDto dto);
    Task<(bool Success, LoginResponseDto? Data, string Message)> RefreshTokenAsync(RefreshTokenDto dto);
}
