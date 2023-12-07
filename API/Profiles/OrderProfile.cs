using AutoMapper;
using Core.Entities;

namespace API.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile() 
        { 
            CreateMap<Order, OrderDTO>();
            CreateMap<OrderDTO, Order>();
            CreateMap<Item, ItemsDTO>();
            CreateMap<ItemsDTO, Item>();
        }
    }
}
