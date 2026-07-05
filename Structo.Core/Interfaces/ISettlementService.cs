using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Structo.Core.DTOs.Settlements;

namespace Structo.Core.Interfaces;

public interface ISettlementService
{
    Task<(bool Success, string Message, Guid SettlementId)> CreateSettlementAsync(Guid projectId, SettlementCreateDto dto, Guid tenantId);
    Task<(bool Success, string Message)> ApproveSettlementAsync(Guid projectId, Guid id, string userRole, Guid resolvedByUserId);
    Task<(bool Success, string Message)> ConfirmRefundAsync(Guid projectId, Guid id, string userRole);
    Task<(bool Success, string Message)> RejectSettlementAsync(Guid projectId, Guid id, SettlementRejectDto dto, string userRole, Guid resolvedByUserId);
    Task<IEnumerable<SettlementMobileDto>> GetSettlementsAsync(Guid projectId, Guid userId, string userRole);
}
