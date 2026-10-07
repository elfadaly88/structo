namespace Structo.Core.Enums;

public enum ManualPaymentStatus
{
    Pending,
    Approved,
    Rejected,
    /// <summary>Never stored: a Pending request past its ExpiresAt is reported as Expired on read.</summary>
    Expired
}
