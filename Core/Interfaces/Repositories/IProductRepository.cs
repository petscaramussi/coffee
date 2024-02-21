using Core.Entities;

namespace Core.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync(int? id);
        Task<IReadOnlyList<ProductType>> GetTypesAsync();
    }
}