namespace Core.Entities
{
    public class ProductType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}