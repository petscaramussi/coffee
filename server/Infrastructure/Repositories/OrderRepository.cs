using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> CreateOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return await _context.Orders.Where(w => w.Id == order.Id).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
            => await _context.Products
            .Include(p => p.ProductType)
            .FirstOrDefaultAsync(p => p.Id == id);

        public async Task<IReadOnlyList<Product>> GetProductsAsync(int? id)
        {
            IQueryable<Product> query = _context.Products.AsQueryable();

            query = query.Include(p => p.ProductType);

            if (id is not null)
                query = query.Where(w => w.ProductTypeId == id);

            return await query.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetTypesAsync()
            => await _context.ProductTypes.ToListAsync();

        public async Task<List<Order>> GetPedidosAsync()
            => await _context.Orders.Include(i => i.Items).ThenInclude(i => i.Product).ThenInclude(i => i.ProductType).ToListAsync();
    }
}