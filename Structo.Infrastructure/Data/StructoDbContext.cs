using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Structo.Core.Entities;
using Structo.Core.Interfaces;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Structo.Core.Enums;
namespace Structo.Infrastructure.Data;

public class StructoDbContext : DbContext, IDataProtectionKeyContext
{
    private readonly ITenantContextAccessor? _tenantContextAccessor;

    public DbSet<DataProtectionKey> DataProtectionKeys { get; set; } = null!;

    public StructoDbContext(DbContextOptions<StructoDbContext> options, ITenantContextAccessor? tenantContextAccessor = null) 
        : base(options)
    {
        _tenantContextAccessor = tenantContextAccessor;
    }

    public Guid? CurrentTenantId => _tenantContextAccessor?.GetCurrentTenantId();

    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<FinancialTransaction> FinancialTransactions => Set<FinancialTransaction>();
    public DbSet<PettyCash> PettyCashes => Set<PettyCash>();
    public DbSet<SitePhoto> SitePhotos => Set<SitePhoto>();
    public DbSet<ProjectCashPool> ProjectCashPools => Set<ProjectCashPool>();
    public DbSet<ProjectBudgetLog> ProjectBudgetLogs => Set<ProjectBudgetLog>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<Settlement> Settlements => Set<Settlement>();
    public DbSet<SettlementLine> SettlementLines => Set<SettlementLine>();
    public DbSet<SubscriptionTransaction> SubscriptionTransactions => Set<SubscriptionTransaction>();
    public DbSet<PaymentAttempt> PaymentAttempts => Set<PaymentAttempt>();
    public DbSet<ProjectMember> ProjectMembers => Set<ProjectMember>();
    public DbSet<SiteTask> SiteTasks => Set<SiteTask>();
    public DbSet<SiteTaskSettlementItem> SiteTaskSettlementItems => Set<SiteTaskSettlementItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<Project>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<ProjectMember>().HasQueryFilter(pm => pm.TenantId == CurrentTenantId);
        modelBuilder.Entity<FinancialTransaction>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<PettyCash>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<SitePhoto>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<ProjectCashPool>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<Settlement>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<SettlementLine>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<Notification>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<SubscriptionTransaction>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<PaymentAttempt>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<SiteTask>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
        modelBuilder.Entity<SiteTaskSettlementItem>().HasQueryFilter(e => e.TenantId == CurrentTenantId);


        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(150);
            entity.Property(e => e.MaxActiveProjects).IsRequired();
            entity.Property(e => e.SubscriptionPlan).HasConversion<string>().HasMaxLength(30);
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(30);
            entity.HasIndex(e => e.Status);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
            entity.Property(e => e.PasswordHash).IsRequired().HasMaxLength(256);
            
            entity.Property(e => e.Role).HasConversion<string>().HasMaxLength(30);
            entity.Property(e => e.IsApproved).HasDefaultValue(true);
            entity.HasIndex(e => e.Email).IsUnique();

            entity.HasOne(e => e.Tenant)
                  .WithMany(t => t.Users)
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.Budget).HasColumnType("numeric(18,2)");
            entity.Property(e => e.ClientName).HasMaxLength(150);
            entity.Property(e => e.Category).HasMaxLength(100);

            // Closeout & Tracking fields
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(30);
            entity.Property(e => e.PublicReviewToken).HasMaxLength(64);
            entity.Property(e => e.PublicShareToken).HasMaxLength(64);
            entity.Property(e => e.ClientReviewNotes).HasMaxLength(2000);
            entity.Property(e => e.ClientRating);
            entity.Property(e => e.IsReviewHidden).HasDefaultValue(false);
            entity.Property(e => e.PropertyType).HasConversion<string>().HasMaxLength(30);
            entity.HasIndex(e => e.PublicReviewToken).IsUnique().HasFilter($"\"{nameof(Project.PublicReviewToken)}\" IS NOT NULL");
            entity.HasIndex(e => e.PublicShareToken).IsUnique().HasFilter($"\"{nameof(Project.PublicShareToken)}\" IS NOT NULL");

            entity.HasOne(e => e.Tenant)
                  .WithMany(t => t.Projects)
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Manager)
                  .WithMany(u => u.ManagedProjects)
                  .HasForeignKey(e => e.ManagerId)
                  .OnDelete(DeleteBehavior.SetNull); 

            entity.HasIndex(e => e.TenantId);
        });

        modelBuilder.Entity<ProjectMember>(entity =>
        {
            entity.HasKey(pm => new { pm.ProjectId, pm.UserId });
            entity.HasIndex(pm => pm.UserId);
            entity.HasIndex(pm => pm.TenantId);

            entity.HasOne(pm => pm.Project)
                  .WithMany(p => p.Members)
                  .HasForeignKey(pm => pm.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(pm => pm.User)
                  .WithMany(u => u.ProjectMemberships)
                  .HasForeignKey(pm => pm.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(pm => pm.Tenant)
                  .WithMany()
                  .HasForeignKey(pm => pm.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<FinancialTransaction>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Amount).HasColumnType("numeric(18,2)"); 
            
            entity.Property(e => e.Type).HasConversion<string>().HasMaxLength(30);
            entity.Property(e => e.SourceType).HasConversion<string>().HasMaxLength(30);

            entity.HasOne(e => e.Tenant)
                  .WithMany()
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Project)
                  .WithMany(p => p.FinancialTransactions)
                  .HasForeignKey(e => e.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade); 

            entity.HasIndex(e => e.ProjectId);
            entity.HasIndex(e => e.TenantId);
            entity.HasIndex(f => new { f.ProjectId, f.Type, f.TransactionDate })
                  .HasDatabaseName("IX_FinancialTransactions_Project_Type_Date");
            entity.HasIndex(f => f.SettlementId)
                  .HasDatabaseName("IX_FinancialTransactions_SettlementId");
        });

        modelBuilder.Entity<PettyCash>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Reason).HasMaxLength(500);
            entity.Property(e => e.Amount).HasColumnType("numeric(18,2)");
            entity.Property(e => e.SpentAmount).HasColumnType("numeric(18,2)");
            entity.Property(e => e.ReturnAmount).HasColumnType("numeric(18,2)");

            entity.HasOne(e => e.Tenant)
                  .WithMany()
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Project)
                  .WithMany(p => p.PettyCashes)
                  .HasForeignKey(e => e.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.IssuedToUser)
                  .WithMany(u => u.PettyCashes)
                  .HasForeignKey(e => e.IssuedToUserId)
                  .OnDelete(DeleteBehavior.Restrict); 

            entity.HasOne(e => e.SourcePool)
                  .WithMany()
                  .HasForeignKey(e => e.SourcePoolId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => e.ProjectId);
            entity.HasIndex(e => e.IssuedToUserId);
            entity.HasIndex(p => new { p.ProjectId, p.Status, p.SourcePoolId })
                  .HasDatabaseName("IX_PettyCash_Project_Status_Pool");
        });

        modelBuilder.Entity<SitePhoto>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.PhotoUrl).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.Caption).HasMaxLength(200).IsRequired(false);
            entity.Property(e => e.Category).HasMaxLength(50).HasDefaultValue("SiteProgress");

            entity.HasOne(e => e.Tenant)
                  .WithMany()
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Project)
                  .WithMany(p => p.SitePhotos)
                  .HasForeignKey(e => e.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.UploadedByUser)
                  .WithMany()
                  .HasForeignKey(e => e.UploadedByUserId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<ProjectCashPool>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.SourceType).HasConversion<string>().HasMaxLength(30);

            entity.HasOne(e => e.Tenant)
                  .WithMany()
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Project)
                  .WithMany()
                  .HasForeignKey(e => e.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(cp => new { cp.ProjectId, cp.SourceType })
                  .HasDatabaseName("IX_ProjectCashPool_Project_SourceType");
        });
        modelBuilder.Entity<ProjectBudgetLog>()
            .HasQueryFilter(p => p.Project!.TenantId == CurrentTenantId);

        modelBuilder.Entity<ProjectBudgetLog>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.OldBudget).HasColumnType("numeric(18,2)");
            entity.Property(e => e.NewBudget).HasColumnType("numeric(18,2)");
            entity.Property(e => e.ReasonForChange).HasMaxLength(500);
            entity.Property(e => e.BoqFileUrl).HasMaxLength(1000);

            entity.HasOne(e => e.Project)
                  .WithMany()
                  .HasForeignKey(e => e.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Message).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.DeepLink).HasMaxLength(500);
            entity.Property(e => e.Type).HasConversion<string>().HasMaxLength(30);
            entity.Property(e => e.TargetRole).HasConversion<string>().HasMaxLength(30);

            entity.HasOne(e => e.Project)
                  .WithMany()
                  .HasForeignKey(e => e.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(e => e.ReceiverId);
            entity.HasIndex(e => e.ProjectId);
        });

        modelBuilder.Entity<Settlement>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(30);
            entity.Property(e => e.TotalAmount).HasColumnType("numeric(18,2)");
            entity.Property(e => e.NetDifference).HasColumnType("numeric(18,2)");
            entity.Property(e => e.Comments).HasMaxLength(500);

            entity.HasOne(e => e.Tenant)
                  .WithMany()
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Project)
                  .WithMany(p => p.Settlements)
                  .HasForeignKey(e => e.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.PettyCash)
                  .WithMany()
                  .HasForeignKey(e => e.PettyCashId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.ResolvedByUser)
                  .WithMany()
                  .HasForeignKey(e => e.ResolvedByUserId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(s => new { s.ProjectId, s.Status })
                  .HasDatabaseName("IX_Settlements_Project_Status");
        });

        modelBuilder.Entity<SettlementLine>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Category).HasMaxLength(100);
            entity.Property(e => e.Amount).HasColumnType("numeric(18,2)");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.InvoiceUrl).HasMaxLength(1000);

            entity.HasOne(e => e.Settlement)
                  .WithMany(s => s.Lines)
                  .HasForeignKey(e => e.SettlementId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<SubscriptionTransaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.TransactionType).IsRequired().HasMaxLength(30);
            entity.Property(e => e.PlanName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.PaymentGateway).HasMaxLength(50);
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.Status).HasMaxLength(30);
            entity.Property(e => e.ReferenceNumber).HasMaxLength(50);
            entity.Property(e => e.Amount).HasColumnType("numeric(18,2)");
            entity.Property(e => e.TaxAmount).HasColumnType("numeric(18,2)");
            entity.Property(e => e.TotalAmount).HasColumnType("numeric(18,2)");

            entity.HasOne(e => e.Tenant)
                  .WithMany()
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(e => e.TenantId);
            entity.HasIndex(e => e.Status);
        });

        modelBuilder.Entity<PaymentAttempt>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).HasColumnType("numeric(18,2)").IsRequired();
            entity.Property(e => e.PlanRequested).IsRequired().HasMaxLength(50);
            entity.Property(e => e.PaymobOrderId).HasMaxLength(100);
            entity.Property(e => e.SpecialReference).IsRequired().HasMaxLength(100);
            entity.Property(e => e.WebhookStatus).IsRequired().HasMaxLength(30);
            entity.Property(e => e.ErrorMessage).HasMaxLength(500);

            entity.HasOne(e => e.Tenant)
                  .WithMany()
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.User)
                  .WithMany()
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(e => e.LinkedTransaction)
                  .WithMany()
                  .HasForeignKey(e => e.LinkedTransactionId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasIndex(e => e.TenantId);
            entity.HasIndex(e => e.PaymobOrderId);
            entity.HasIndex(e => e.SpecialReference);
            entity.HasIndex(e => e.WebhookStatus);
            entity.HasIndex(e => e.CreatedAt);
        });

        modelBuilder.Entity<SiteTask>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(250);
            entity.Property(e => e.Description).HasMaxLength(2000);
            entity.Property(e => e.EngineerNotes).HasMaxLength(2000);
            entity.Property(e => e.Weight).HasColumnType("numeric(18,4)").HasDefaultValue(1.0m);
            entity.Property(e => e.ProgressPercentage).HasDefaultValue(0);
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(30);

            entity.HasOne(e => e.Project)
                  .WithMany(p => p.SiteTasks)
                  .HasForeignKey(e => e.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne<User>()
                  .WithMany()
                  .HasForeignKey(e => e.AssignedEngineerId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => e.ProjectId);
            entity.HasIndex(e => e.TenantId);
            entity.HasIndex(e => e.AssignedEngineerId);
            entity.HasIndex(e => e.Status);
        });

        modelBuilder.Entity<SiteTaskSettlementItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.AllocatedAmount).HasColumnType("numeric(18,2)");
            entity.Property(e => e.ExpenseDescription).HasMaxLength(500);

            entity.HasOne(e => e.SiteTask)
                  .WithMany(st => st.LinkedSettlementItems)
                  .HasForeignKey(e => e.SiteTaskId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.SettlementItem)
                  .WithMany()
                  .HasForeignKey(e => e.SettlementItemId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => e.SiteTaskId);
            entity.HasIndex(e => e.SettlementItemId);
            entity.HasIndex(e => e.TenantId);
        });
    }

    public override int SaveChanges()
    {
        SetTenantIdOnSave();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        SetTenantIdOnSave();
        return base.SaveChangesAsync(cancellationToken);
    }

   private void SetTenantIdOnSave()
{
    // 1. الميكانزم القديم الطبيعي لكل الجداول
    var entries = ChangeTracker.Entries<ITenantEntity>()
        .Where(e => e.State == EntityState.Added);

    foreach (var entry in entries)
    {
        if (CurrentTenantId.HasValue && CurrentTenantId.Value != Guid.Empty)
        {
            entry.Entity.TenantId = CurrentTenantId.Value;
        }
    }

    // 2. 🚀 الحل السحري لحل لغم الـ FK في الـ Master-Detail (Settlement Lines)
    var settlementEntries = ChangeTracker.Entries<Settlement>()
        .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

    foreach (var entry in settlementEntries)
    {
        if (entry.Entity.Lines != null && entry.Entity.Lines.Any())
        {
            foreach (var line in entry.Entity.Lines)
            {
                // نجبر السطر ياخد نفس الـ TenantId بتاع الـ Settlement الأب فوراً
                line.TenantId = entry.Entity.TenantId;
            }
        }
    }

    // 3. Master-Detail TenantId sync for SiteTasks and LinkedSettlementItems
    var siteTaskEntries = ChangeTracker.Entries<SiteTask>()
        .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

    foreach (var entry in siteTaskEntries)
    {
        if (entry.Entity.LinkedSettlementItems != null && entry.Entity.LinkedSettlementItems.Any())
        {
            foreach (var item in entry.Entity.LinkedSettlementItems)
            {
                item.TenantId = entry.Entity.TenantId;
            }
        }
    }
}
}
