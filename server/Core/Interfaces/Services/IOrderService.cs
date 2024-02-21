using Core.Entities;

namespace Core.Interfaces.Repositories
{
    public interface IOrderService
    {
        Task<List<Order>> CreateOrder(Order order);
        Task<List<Order>> GetPedidosAsync();
    }
}