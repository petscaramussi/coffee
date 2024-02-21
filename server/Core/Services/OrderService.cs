using Core.Entities;
using Core.Interfaces.Repositories;

namespace Core.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;

        public OrderService(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Order>> CreateOrder(Order order)
        {
            return await _repository.CreateOrder(order);
        }

        public async Task<List<Order>> GetPedidosAsync()
        {
            return await _repository.GetPedidosAsync();
        }
    }
}
