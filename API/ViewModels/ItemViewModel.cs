using Core.Entities;

namespace API.ViewModels
{
    public class ItemViewModel
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Qtde { get; set; }

        public ProductViewModel Product { get; set; }

        public ItemViewModel() { }
    }
}
