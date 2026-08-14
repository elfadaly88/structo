using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Structo.Core.Interfaces;

namespace Structo.Infrastructure.Storage;

public class TenantCleanupWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<TenantCleanupWorker> _logger;
    private static readonly TimeSpan Interval = TimeSpan.FromHours(12);

    public TenantCleanupWorker(
        IServiceScopeFactory scopeFactory,
        ILogger<TenantCleanupWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("[TenantCleanupWorker] Worker initialized. First check scheduled in 30 seconds.");
        
        // Wait 30 seconds after startup before the initial check to allow migrations to complete
        try
        {
            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        }
        catch (OperationCanceledException)
        {
            return;
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                _logger.LogInformation("[TenantCleanupWorker] Starting scheduled inactivity cleanup scan...");
                
                using (var scope = _scopeFactory.CreateScope())
                {
                    var cleanupService = scope.ServiceProvider.GetRequiredService<ITenantCleanupService>();
                    var purgedCount = await cleanupService.RunAutomatedInactivityCleanupAsync(inactiveDaysThreshold: 60, stoppingToken);
                    
                    _logger.LogInformation("[TenantCleanupWorker] Scan completed. Purged {Count} inactive Free-tier tenants.", purgedCount);
                }
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[TenantCleanupWorker] Unhandled error during scheduled inactivity cleanup.");
            }

            try
            {
                await Task.Delay(Interval, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }

        _logger.LogInformation("[TenantCleanupWorker] Background worker stopping.");
    }
}
