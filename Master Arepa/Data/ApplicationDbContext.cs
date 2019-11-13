using Master_Arepa.Models;
using Master_Arepa.Models.InventoryViewModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Master_Arepa.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<InventoryItem> InventoryItem { get; set; }

        public DbSet<HomeInventoryItem> HomeInventoryItem { get; set; }

        public DbSet<FTInventoryItem> FTInventoryItems { get; set; }

        public DbSet<TentInventoryItem> TentInventoryItems { get; set; }

        public DbSet<InventoryTimeStamp> InventoryTimeStamp { get; set; }

        public DbSet<InventoryItemType> InventoryItemType { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
