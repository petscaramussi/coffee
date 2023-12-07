using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired().HasMaxLength(100);
            builder.Property(p => p.Price).HasColumnName("Price").HasColumnType("Decimal(18,2)");
            builder.Property(p => p.PictureUrl).HasColumnName("PictureUrl").IsRequired();

            // RELACIONAMENTO
            builder.HasOne(t => t.ProductType)
                   .WithMany(many => many.Products)
                   .HasForeignKey(p => p.ProductTypeId);

            builder.HasMany(t => t.Items)
                   .WithOne(many => many.Product)
                   .HasForeignKey(p => p.ProductId);
        }
    }
}