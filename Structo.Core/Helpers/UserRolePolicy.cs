using Structo.Core.Enums;

namespace Structo.Core.Helpers;

/// <summary>
/// Which roles a caller may assign when creating a user. Shared by every endpoint that takes a role from input.
/// </summary>
public static class UserRolePolicy
{
    /// <summary>Returns an error message when <paramref name="requested"/> may not be assigned by <paramref name="callerRole"/>, otherwise null.</summary>
    public static string? ValidateAssignableRole(UserRole requested, string callerRole)
    {
        // One owner per tenant: the owner is created only with the tenant itself (registration / tenant provisioning)
        if (requested == UserRole.TenantOwner)
            return "ROLE_NOT_ALLOWED: A company can have only one TenantOwner.";

        if (requested == UserRole.SuperAdmin && callerRole != nameof(UserRole.SuperAdmin))
            return "ROLE_NOT_ALLOWED: Only a SuperAdmin can create SuperAdmin accounts.";

        return null;
    }
}
