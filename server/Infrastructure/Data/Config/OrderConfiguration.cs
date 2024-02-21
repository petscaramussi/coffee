using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(100);
            builder.Property(p => p.Tel).HasColumnName("Tel").IsRequired().HasMaxLength(100);
            builder.Property(p => p.Address).HasColumnName("Address");
            builder.Property(p => p.AddressComplement).HasColumnName("AddressComplement").IsRequired();
            builder.Property(p => p.Payment).HasColumnName("Payment");

            // RELACIONAMENTO
            builder.HasMany(t => t.Items)
                   .WithOne(t => t.Order)
                   .HasForeignKey(p => p.OrderId);
        }
    }
}
