using API.ViewModels;
using AutoMapper;
using Core.Entities;
using Core.Interfaces.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;
        private readonly IMapper _mapper;
        private readonly IValidator<Order> _validator;

        public OrderController(IOrderService service,
                               IMapper mapper,
                               IValidator<Order> validator)
        {
            _service = service;
            _mapper = mapper;
            _validator = validator;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePedido([FromBody] Order order)
        {
            FluentValidation.Results.ValidationResult result = await _validator.ValidateAsync(order);
            if (!result.IsValid)
                return BadRequest(Results.ValidationProblem(result.ToDictionary()));

            List<Order> resultado = await _service.CreateOrder(order);
            IEnumerable<OrderViewModel> viewModel = _mapper.Map<IEnumerable<OrderViewModel>>(resultado);
            return Ok(viewModel);
        }

        [HttpGet]
        public async Task<IActionResult> GetPedidos()
        {
            List<Order> result = await _service.GetPedidosAsync();
            List<OrderViewModel> dto = _mapper.Map<List<OrderViewModel>>(result);

            foreach (OrderViewModel info in dto)
                foreach (ItemViewModel item in info.Items)
                    info.FinalPrice = item.Qtde * item.Product.Price + info.FinalPrice;

            return Ok(dto);
        }
    }
}
