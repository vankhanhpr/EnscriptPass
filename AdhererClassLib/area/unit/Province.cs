using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Province
    {
        [Key]
        public string matp { get; set; }

        public string name { get; set; }
        public string type { get; set; }
    }
}
