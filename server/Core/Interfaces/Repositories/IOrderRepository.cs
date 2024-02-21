using Core.Entities;

namespace Core.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        Task<List<Order>> CreateOrder(Order order);
        Task<List<Order>> GetPedidosAsync();
    }
}