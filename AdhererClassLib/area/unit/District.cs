using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class District
    {
        [Key]
        public string maqh { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string matp { get; set; }
    }
}
