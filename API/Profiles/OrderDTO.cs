using Core.Entities;

namespace API.Profiles
{
    public class OrderDTO
    {
        public string Name { get; set; }
        public string Tel { get; set; }
        public string Address { get; set; }
        public string AddressComplement { get; set; }
        public string Payment { get; set; }

        public ItemsDTO Items { get; set; }
    }
}
