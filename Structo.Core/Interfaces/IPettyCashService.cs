using Structo.Core.DTOs.PettyCash;
using System;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IPettyCashService
{
    Task<bool> SettlePettyCashAsync(Guid projectId, Guid pettyCashId, PettyCashSettleDto dto);
}
