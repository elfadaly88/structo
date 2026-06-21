using System;

namespace Structo.Core.Interfaces;

/// <summary>
/// Interface to enforce multi-tenancy on entities.
/// </summary>
public interface ITenantEntity
{
    Guid TenantId { get; set; }
}
