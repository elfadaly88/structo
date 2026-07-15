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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<DataProtectionKey>().ToTable("DataProtectionKeys");        
        modelBuilder.Entity<User>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<Project>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<FinancialTransaction>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<PettyCash>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<SitePhoto>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<ProjectCashPool>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<Settlement>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<SettlementLine>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        // Notifications: SuperAdmin sees all (null TenantId = global), tenant users see only their own
        modelBuilder.Entity<Notification>().HasQueryFilter(e =>
            CurrentTenantId == null ||
            e.TenantId == null ||
            e.TenantId == CurrentTenantId);

        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(150);
            entity.Property(e => e.MaxActiveProjects).IsRequired();
            entity.Property(e => e.SubscriptionPlan).HasConversion<string>().HasMaxLength(30);
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(30);
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

            // Closeout fields
            entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(30);
            entity.Property(e => e.PublicReviewToken).HasMaxLength(64);
            entity.Property(e => e.ClientReviewNotes).HasMaxLength(2000);
            entity.Property(e => e.ClientRating);
            entity.Property(e => e.IsReviewHidden).HasDefaultValue(false);
            entity.Property(e => e.PropertyType).HasConversion<string>().HasMaxLength(30);
            entity.HasIndex(e => e.PublicReviewToken).IsUnique().HasFilter($"\"{nameof(Project.PublicReviewToken)}\" IS NOT NULL");

            entity.HasOne(e => e.Tenant)
                  .WithMany(t => t.Projects)
                  .HasForeignKey(e => e.TenantId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Manager)
                  .WithMany(u => u.ManagedProjects)
                  .HasForeignKey(e => e.ManagerId)
                  .OnDelete(DeleteBehavior.SetNull); 
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
        });

        modelBuilder.Entity<SitePhoto>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.PhotoUrl).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.Description).HasMaxLength(500);

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
        });
        modelBuilder.Entity<ProjectBudgetLog>()
            .HasQueryFilter(p => CurrentTenantId == null || p.Project!.TenantId == CurrentTenantId);

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
}
}
