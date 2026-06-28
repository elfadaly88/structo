using Structo.Core.Entities;

namespace Structo.Core.Interfaces;

public interface ITokenProvider
{
    string GenerateToken(User user);
}
