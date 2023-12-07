﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Qtde { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }

        public Item() { }
    }
}
