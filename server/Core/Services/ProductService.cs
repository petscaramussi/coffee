using Core.Entities;
using Core.Interfaces.Repositories;

namespace Core.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _repository.GetProductByIdAsync(id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync(int? id)
        {
            return await _repository.GetProductsAsync(id);

        }

        public async Task<IReadOnlyList<ProductType>> GetTypesAsync()
        {
            return await _repository.GetTypesAsync();
        }
    }
}
