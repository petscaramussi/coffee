using Core.Entities;

namespace Core.Interfaces.Repositories
{
    public interface IProductService
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync(int? id);
        Task<IReadOnlyList<ProductType>> GetTypesAsync();
    }
}