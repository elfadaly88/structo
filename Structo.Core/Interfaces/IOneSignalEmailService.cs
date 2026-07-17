using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IOneSignalEmailService
{
    // 1. Existing Welcome Email
    Task SendWelcomeEmailAsync(string email, string fullName);

    // 2. Invitation Email for team members
    Task SendInvitationEmailAsync(string email, string fullName, string tenantName, string inviteLink);

    // 3. Tenant Activation success confirmation
    Task SendTenantActivatedEmailAsync(string email, string fullName, string tenantName);
}
