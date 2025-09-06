using core8_solidjs_db2.Entities;
using Microsoft.EntityFrameworkCore;

namespace core8_solidjs_db2.Helpers
{
    public class Db2DbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        public Db2DbContext(DbContextOptions<Db2DbContext> options) 
            : base(options) 
        {
        }           

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(u => u.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<User>()
                .ToTable("USERS", ts => ts.HasComment("TABLESPACE USERS_TS"));
                
            modelBuilder.Entity<Product>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Product>()
                .ToTable("PRODUCTS", t => t.HasComment("TABLESPACE PRODUCTS_TS"));
        }        
    }    
}