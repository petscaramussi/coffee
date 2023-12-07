using API.Profiles;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(int? TypeId)
        {
            var products = await _repo.GetProductsAsync(TypeId);

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _repo.GetProductByIdAsync(id);
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetTypes()
        {
            return Ok(await _repo.GetTypesAsync());
        }

        [HttpPost("order")]
        public async Task<IActionResult> CreatePedido( Order order)
        {
            var resultado = await _repo.CreateOrder(order);
            return Ok(resultado);
        }
    }
}