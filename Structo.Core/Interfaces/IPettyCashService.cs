using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.PettyCash;
using Structo.Core.DTOs.Transactions;
using System;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IPettyCashService
{
    Task<(bool Success, string Message)> CreatePettyCashAsync(Guid projectId, PettyCashCreateDto dto, Guid? tenantId, string userRole);
    Task<(bool Success, string Message)> ApprovePettyCashAsync(Guid projectId, Guid id, PettyCashApproveDto dto);
    Task<(bool Success, string Message)> RejectPettyCashAsync(Guid projectId, Guid id, PettyCashRejectDto dto);
    Task<bool> SettlePettyCashAsync(Guid projectId, Guid id, PettyCashSettleDto dto);
    Task<PaginatedList<PettyCashMobileDto>> GetMobilePettyCashAsync(Guid projectId, int pageNumber, int pageSize, Guid userId, string userRole);
    Task<(bool Success, string Message)> UpdatePettyCashAsync(Guid projectId, Guid id, PettyCashUpdateDto dto);
    Task<(bool Success, string Message)> DeletePettyCashAsync(Guid projectId, Guid id);
}
