using AutoMapper;
using Core.Entities;

namespace API.Profiles
{
    public class Profiles : Profile
    {
        public Profiles() 
        { 
            CreateMap<Order, OrderDTO>();
            CreateMap<OrderDTO, Order>();
            CreateMap<Item, ItemsDTO>();
            CreateMap<ItemsDTO, Item>();
            CreateMap<Product, ProductDTO>();
            CreateMap<ProductDTO, Product>();
        }
    }
}
