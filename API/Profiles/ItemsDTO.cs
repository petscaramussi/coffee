namespace API.Profiles
{
    public class ItemsDTO
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Qtde { get; set; }

        public ProductDTO Product { get; set; }

        public ItemsDTO() { }
    }
}
