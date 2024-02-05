using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync(int? id);
        Task<IReadOnlyList<ProductType>> GetTypesAsync();
        Task<List<Order>> CreateOrder(Order order);
        Task<List<Order>> GetPedidosAsync();
    }
}