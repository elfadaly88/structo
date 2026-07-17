using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Users;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Structo.API.Controllers
{
    [ApiController]
    [Route("api/employees")]
    [Authorize]
    public class EmployeeManagementController : ControllerBase
    {
        private readonly StructoDbContext _context;
        private readonly ITenantContextAccessor _tenantAccessor;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmployeeManagementController> _logger;

        public EmployeeManagementController(
            StructoDbContext context, 
            ITenantContextAccessor tenantAccessor,
            IServiceScopeFactory scopeFactory,
            IConfiguration configuration,
            ILogger<EmployeeManagementController> logger)
        {
            _context = context;
            _tenantAccessor = tenantAccessor;
            _scopeFactory = scopeFactory;
            _configuration = configuration;
            _logger = logger;
        }

        private string CurrentUserRole => User.FindFirstValue("role") ?? User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

        [HttpPost]
        [Authorize(Roles = "TenantOwner,SuperAdmin")]
        public async Task<ActionResult<ApiResponse<UserDto>>> AddEmployee([FromBody] UserCreateDto dto)
        {
            if (dto == null)
            {
                return BadRequest(new ApiResponse<UserDto>
                {
                    Success = false,
                    Message = "Invalid employee request data."
                });
            }

            var emailNormalized = dto.Email.Trim().ToLower();
            var exists = await _context.Users.IgnoreQueryFilters().AnyAsync(u => u.Email == emailNormalized);
            if (exists)
            {
                return BadRequest(new ApiResponse<UserDto>
                {
                    Success = false,
                    Message = "Email is already registered"
                });
            }

            // TODO [SECURITY - PRE-PRODUCTION]: Replace this static password with a secure random password generator.
            // Current: hardcoded "Password@123" for QA/E2E testing convenience.
            // Target:  Use a cryptographically-secure random password (e.g., RandomNumberGenerator + Base64)
            //          and send the password to the user via the OneSignal invitation email.
            // MUST be reverted before ANY production deployment to real clients.
            var secureTempPassword = "Password@123";
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(secureTempPassword);

            var tenantId = _tenantAccessor.GetCurrentTenantId();

            var employee = new User
            {
                FirstName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.FirstName),
                LastName = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.LastName),
                Email = emailNormalized,
                PersonalPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.PersonalPhone),
                WhatsAppPhone = Structo.Core.Helpers.HtmlSanitizer.Sanitize(dto.WhatsAppPhone),
                PasswordHash = passwordHash,
                Role = dto.Role,
                TenantId = tenantId,
                IsActive = true,
                IsApproved = true // 🔒 Crucial: manually pre-approved
            };

            _context.Users.Add(employee);
            await _context.SaveChangesAsync();

            // Send Invitation Email via OneSignal in the background
            var targetEmail = employee.Email;
            var targetFullName = $"{employee.FirstName} {employee.LastName}";
            var targetTenantId = tenantId;
            var clientBaseUrl = _configuration["OneSignal:ClientBaseUrl"] ?? "https://structo-production.up.railway.app";
            var inviteLink = $"{clientBaseUrl.TrimEnd('/')}/login";

            _ = Task.Run(async () =>
            {
                try
                {
                    using var scope = _scopeFactory.CreateScope();
                    var emailService = scope.ServiceProvider.GetRequiredService<IOneSignalEmailService>();
                    var dbContext = scope.ServiceProvider.GetRequiredService<StructoDbContext>();
                    
                    string tenantName = string.Empty;
                    if (targetTenantId.HasValue)
                    {
                        var tenant = await dbContext.Tenants.FindAsync(targetTenantId.Value);
                        tenantName = tenant?.Name ?? string.Empty;
                    }
                    
                    await emailService.SendInvitationEmailAsync(targetEmail, targetFullName, tenantName, inviteLink);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Background error sending invitation email to {Email}", targetEmail);
                }
            });

            var resultDto = new UserDto
            {
                Id = employee.Id,
                IsActive = employee.IsActive,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                PersonalPhone = employee.PersonalPhone,
                WhatsAppPhone = employee.WhatsAppPhone,
                Role = employee.Role,
                CreatedAt = employee.CreatedAt
            };

            return Ok(new ApiResponse<UserDto>
            {
                Success = true,
                Message = "Employee pre-registered successfully.",
                Data = resultDto
            });
        }
    }
}
