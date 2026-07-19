using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IFinancialTransactionService
{
    Task<(bool Success, string Message)> CreateTransactionAsync(Guid projectId, FinancialTransactionCreateDto dto, string userRole);
    Task<PaginatedList<FinancialTransactionMobileDto>> GetMobileTransactionsAsync(Guid projectId, int pageNumber, int pageSize, string userRole);
    Task<(bool Success, string Message)> InjectCapitalAsync(Guid projectId, CapitalInjectDto dto, Guid? tenantId, string userRole);
    Task<IEnumerable<ProjectCashPool>> GetCashPoolsAsync(Guid projectId, string userRole);
    Task<(bool Success, string Message)> UpdateTransactionAsync(Guid projectId, Guid id, FinancialTransactionUpdateDto dto, string userRole);
    Task<(bool Success, string Message)> DeleteTransactionAsync(Guid projectId, Guid id, string userRole);
    Task<(bool Success, string Message)> DirectDisbursementAsync(Guid projectId, DirectDisbursementDto dto, Guid tenantId, string userRole, Guid currentUserId);
    Task<bool> UserHasAccessToProjectAsync(ClaimsPrincipal user, Guid projectId);
}

