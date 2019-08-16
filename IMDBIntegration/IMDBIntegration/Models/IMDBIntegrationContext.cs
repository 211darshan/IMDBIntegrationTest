using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IMDBShow.Models
{
    public partial class IMDBIntegrationContext : DbContext
    {
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserShow> UserShow { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=tcp:imdbintegration.database.windows.net,1433;Initial Catalog=IMDBIntegration;Persist Security Info=False;User ID=imdbuser;Password=imdb@123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(4000);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<UserShow>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.NextEpisodeId)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.ShowId)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserShow)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserShow__UserId__5165187F");
            });
        }
    }
}
