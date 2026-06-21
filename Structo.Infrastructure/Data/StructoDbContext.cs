using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Structo.Core.Entities;
using Structo.Core.Interfaces;

namespace Structo.Infrastructure.Data;

public class StructoDbContext : DbContext
{
    private readonly ITenantContextAccessor? _tenantContextAccessor;

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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<Project>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<FinancialTransaction>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<PettyCash>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);
        modelBuilder.Entity<SitePhoto>().HasQueryFilter(e => CurrentTenantId == null || e.TenantId == CurrentTenantId);

        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(150);
            entity.Property(e => e.MaxActiveProjects).IsRequired();
            entity.Property(e => e.SubscriptionPlan).HasConversion<string>().HasMaxLength(30);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
            entity.Property(e => e.PasswordHash).IsRequired().HasMaxLength(256);
            
            entity.Property(e => e.Role).HasConversion<string>().HasMaxLength(30);

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
        var entries = ChangeTracker.Entries<ITenantEntity>()
            .Where(e => e.State == EntityState.Added);

        foreach (var entry in entries)
        {
            if (CurrentTenantId.HasValue && CurrentTenantId.Value != Guid.Empty)
            {
                entry.Entity.TenantId = CurrentTenantId.Value;
            }
        }
    }
}
