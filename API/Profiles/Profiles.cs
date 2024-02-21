using API.ViewModels;
using AutoMapper;
using Core.Entities;

namespace API.Profiles
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Order, OrderViewModel>();
            CreateMap<OrderViewModel, Order>();
            CreateMap<Item, ItemViewModel>();
            CreateMap<ItemViewModel, Item>();
            CreateMap<Product, ProductViewModel>();
            CreateMap<ProductViewModel, Product>();
        }
    }
}
