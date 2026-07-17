using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Structo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Structo.API.Services;

public class OneSignalEmailService : IOneSignalEmailService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<OneSignalEmailService> _logger;
    private readonly string _oneSignalAppId;
    private readonly string _oneSignalRestApiKey;
    private readonly string _welcomeTemplateId;
    private readonly string _invitationTemplateId;
    private readonly string _tenantActivatedTemplateId;
    private readonly string _fromName;
    private readonly string _fromAddress;

    public OneSignalEmailService(
        IHttpClientFactory httpClientFactory,
        ILogger<OneSignalEmailService> logger,
        IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _oneSignalAppId = configuration["OneSignal:AppId"] ?? string.Empty;
        _oneSignalRestApiKey = configuration["OneSignal:RestApiKey"] ?? string.Empty;
        _welcomeTemplateId = configuration["OneSignal:WelcomeTemplateId"] ?? string.Empty;
        _invitationTemplateId = configuration["OneSignal:InvitationTemplateId"] ?? string.Empty;
        _tenantActivatedTemplateId = configuration["OneSignal:TenantActivatedTemplateId"] ?? string.Empty;
        _fromName = configuration["OneSignal:FromName"] ?? "أُسُس / Ousos (No-Reply)";
        _fromAddress = configuration["OneSignal:FromAddress"] ?? "no-reply@yourdomain.com";
    }

    public async Task SendWelcomeEmailAsync(string email, string fullName)
    {
        var customData = new Dictionary<string, object?>
        {
            ["fullName"] = fullName
        };
        await SendEmailWithTemplateAsync(email, _welcomeTemplateId, "Welcome Email", customData);
    }

    public async Task SendInvitationEmailAsync(string email, string fullName, string tenantName, string inviteLink)
    {
        var customData = new Dictionary<string, object?>
        {
            ["fullName"] = fullName,
            ["tenantName"] = tenantName,
            ["inviteLink"] = inviteLink
        };
        await SendEmailWithTemplateAsync(email, _invitationTemplateId, "Invitation Email", customData);
    }

    public async Task SendTenantActivatedEmailAsync(string email, string fullName, string tenantName)
    {
        var customData = new Dictionary<string, object?>
        {
            ["fullName"] = fullName,
            ["tenantName"] = tenantName
        };
        await SendEmailWithTemplateAsync(email, _tenantActivatedTemplateId, "Tenant Activated Email", customData);
    }

    private async Task SendEmailWithTemplateAsync(string email, string templateId, string templateNameForLogger, Dictionary<string, object?> customData)
    {
        if (string.IsNullOrEmpty(_oneSignalAppId) || string.IsNullOrEmpty(_oneSignalRestApiKey) || string.IsNullOrEmpty(templateId))
        {
            _logger.LogWarning("OneSignal email configuration is incomplete. {TemplateName} skipped. Check template settings.", templateNameForLogger);
            return;
        }

        try
        {
            var client = _httpClientFactory.CreateClient("OneSignal");
            client.Timeout = TimeSpan.FromSeconds(5);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", _oneSignalRestApiKey);

            var payload = new Dictionary<string, object?>
            {
                ["app_id"] = _oneSignalAppId,
                ["template_id"] = templateId,
                ["include_email_tokens"] = new[] { email },
                ["custom_data"] = customData
            };

            if (!string.IsNullOrEmpty(_fromName))
                payload["email_from_name"] = _fromName;

            if (!string.IsNullOrEmpty(_fromAddress))
                payload["email_from_address"] = _fromAddress;

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            using var cts = new System.Threading.CancellationTokenSource(TimeSpan.FromSeconds(5));
            var response = await client.PostAsync("https://onesignal.com/api/v1/notifications", content, cts.Token);

            if (!response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                _logger.LogWarning("OneSignal {TemplateName} failed with status code {StatusCode}. Response: {ResponseBody}", templateNameForLogger, response.StatusCode, body);
            }
            else
            {
                _logger.LogInformation("Successfully sent {TemplateName} to {Email}", templateNameForLogger, email);
            }
        }
        catch (OperationCanceledException)
        {
            _logger.LogWarning("OneSignal email request for {TemplateName} timed out (5s limit). Request was aborted.", templateNameForLogger);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "OneSignal {TemplateName} failed due to exception.", templateNameForLogger);
        }
    }
}
