using API.ViewModels;
using AutoMapper;
using Core.Entities;
using Core.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using static Core.Exceptions.ThrowIf;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly IMapper _mapper;

        public ProductsController(IProductService service,
                                  IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts(int? typeId)
        {
            Throw<ArgumentException>.If(typeId is null || typeId.Value <= 0, "Invalid Type");
            IReadOnlyList<Product> products = await _service.GetProductsAsync(typeId);
            IEnumerable<ProductViewModel> viewModel = _mapper.Map<IEnumerable<ProductViewModel>>(products);

            return Ok(viewModel);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            Throw<ArgumentException>.If(id <= 0, "Invalid Type");
            Product product = await _service.GetProductByIdAsync(id);
            ProductViewModel viewModel = _mapper.Map<ProductViewModel>(product);

            return Ok(viewModel);
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetTypes()
            => Ok(await _service.GetTypesAsync());
    }
}