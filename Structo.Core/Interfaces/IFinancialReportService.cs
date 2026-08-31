using System;
using System.Threading.Tasks;
using Structo.Core.DTOs.Reports;

namespace Structo.Core.Interfaces;

public interface IFinancialReportService
{
    Task<ProjectFullReportDto?> GetSingleProjectFullReportAsync(Guid projectId, DateTime? startDate, DateTime? endDate, Guid currentTenantId);
    Task<CompanyWideReportDto> GetCompanyWideFullReportAsync(Guid currentTenantId, Guid currentUserId, string currentUserRole, DateTime? startDate, DateTime? endDate, Guid? filterProjectId);
}
