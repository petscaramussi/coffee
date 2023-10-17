using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Config
{
    internal class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.HasOne(b => b.ItemType).WithMany()
                .HasForeignKey(p => p.ItemTypeId);
        }
    }
}
