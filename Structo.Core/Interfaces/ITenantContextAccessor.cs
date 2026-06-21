using System;

namespace Structo.Core.Interfaces;

public interface ITenantContextAccessor
{
    Guid? GetCurrentTenantId();
}
