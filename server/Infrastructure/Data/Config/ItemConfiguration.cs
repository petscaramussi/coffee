﻿using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Property(p => p.OrderId).HasColumnName("OrderId").IsRequired();
            builder.Property(p => p.ProductId).HasColumnName("ProductId").IsRequired();
            builder.Property(p => p.Qtde).HasColumnName("Qtde");

            // RELACIONAMENTO
            builder.HasOne(t => t.Order)
                   .WithMany(many => many.Items)
                   .HasForeignKey(p => p.OrderId);

            builder.HasOne(t => t.Product)
                   .WithMany(many => many.Items)
                   .HasForeignKey(p => p.ProductId);
        }
    }
}
