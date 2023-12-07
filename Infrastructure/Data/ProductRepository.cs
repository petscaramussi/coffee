using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
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
            try
            {
                //var listaItems = order.Items;
                //order.Items = new List<Item>();
                //var novo = order;
                //_context.Orders.Add(novo);
                //await _context.SaveChangesAsync();
                //foreach(var item in listaItems)
                //{
                //    item.OrderId = novo.Id;
                //}
                //_context.Items.AddRange(listaItems);

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                return await _context.Orders.Include(i => i.Items).ThenInclude(i => i.Product).ThenInclude(i => i.ProductType).ToListAsync();
            }catch (Exception)
            {
                throw;
            }
            
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
            .Include(p => p.ProductType)
            .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync(int? id)
        {
            var query = _context.Products.AsQueryable();

            query = query.Include(p => p.ProductType);

            if (id is not null)
                query = query.Where(w => w.ProductTypeId == id);
            
            return await query.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }
    }
}