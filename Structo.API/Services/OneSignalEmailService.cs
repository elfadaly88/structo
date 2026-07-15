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
    }

    public async Task SendWelcomeEmailAsync(string email, string name)
    {
        if (string.IsNullOrEmpty(_oneSignalAppId) || string.IsNullOrEmpty(_oneSignalRestApiKey) || string.IsNullOrEmpty(_welcomeTemplateId))
        {
            _logger.LogWarning("OneSignal email configuration is incomplete. Welcome email skipped.");
            return;
        }

        try
        {
            var client = _httpClientFactory.CreateClient("OneSignal");
            client.Timeout = TimeSpan.FromSeconds(5);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Key", _oneSignalRestApiKey);

            var payload = new Dictionary<string, object?>
            {
                ["app_id"] = _oneSignalAppId,
                ["template_id"] = _welcomeTemplateId,
                ["email_to_address"] = new[] { email },
                ["target_channel"] = "email"
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            using var cts = new System.Threading.CancellationTokenSource(TimeSpan.FromSeconds(5));
            var response = await client.PostAsync("https://onesignal.com/api/v1/notifications", content, cts.Token);

            if (!response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                _logger.LogWarning("OneSignal welcome email failed with status code {StatusCode}. Response: {ResponseBody}", response.StatusCode, body);
            }
            else
            {
                _logger.LogInformation("Successfully sent welcome email to {Email}", email);
            }
        }
        catch (OperationCanceledException)
        {
            _logger.LogWarning("OneSignal email request timed out (5s limit). Request was aborted.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "OneSignal welcome email failed due to exception.");
        }
    }
}
