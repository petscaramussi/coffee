using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("products")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts() 
        {
            var products = await _context.Products.Include(p => p.ItemType).ToListAsync();


            return products;
        }

        [HttpGet("{id}")]
        public async Task<Product> GetProductById(int id) 
        {
            return await _context.Products.Include(p => p.ItemType).FirstOrDefaultAsync(p => p.Id == id);
        }

    }
}


