using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IOneSignalEmailService
{
    Task SendWelcomeEmailAsync(string email, string name);
}
