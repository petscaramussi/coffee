using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly StoreContext _context;

        public OrderRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> CreateOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return await _context.Orders.Include(i => i.Items).ThenInclude(i => i.Product).Where(w => w.Id == order.Id).ToListAsync();
        }

        public async Task<List<Order>> GetPedidosAsync()
            => await _context.Orders.Include(i => i.Items).ThenInclude(i => i.Product).ThenInclude(i => i.ProductType).ToListAsync();
    }
}