using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Tel { get; set; }
        public string Address { get; set; }
        public string AddressComplement { get; set; }
        public string Payment { get; set; }

        [NotMapped]
        public virtual ICollection<Item> Items { get; set; }
    }
}
