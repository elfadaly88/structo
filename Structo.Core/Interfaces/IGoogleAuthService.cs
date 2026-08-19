using Structo.Core.DTOs.Auth;
using Structo.Core.DTOs.Common;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IGoogleAuthService
{
    Task<ApiResponse<LoginResponseDto>> AuthenticateGoogleUserAsync(string idToken);
}
