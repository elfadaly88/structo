using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Transactions;
using Structo.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface IFinancialTransactionService
{
    Task<(bool Success, string Message)> CreateTransactionAsync(Guid projectId, FinancialTransactionCreateDto dto, string userRole);
    Task<PaginatedList<FinancialTransactionMobileDto>> GetMobileTransactionsAsync(Guid projectId, int pageNumber, int pageSize);
    Task<(bool Success, string Message)> InjectCapitalAsync(Guid projectId, CapitalInjectDto dto, Guid? tenantId);
    Task<IEnumerable<ProjectCashPool>> GetCashPoolsAsync(Guid projectId);
    Task<(bool Success, string Message)> UpdateTransactionAsync(Guid projectId, Guid id, FinancialTransactionUpdateDto dto);
    Task<(bool Success, string Message)> DeleteTransactionAsync(Guid projectId, Guid id);
    Task<(bool Success, string Message)> DirectDisbursementAsync(Guid projectId, DirectDisbursementDto dto, Guid tenantId, string userRole);
}
