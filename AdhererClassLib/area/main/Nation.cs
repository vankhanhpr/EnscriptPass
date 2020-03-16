using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Nation
    {
        [Key]
        public int nationid { get; set; }
        public string name { get; set; }
        public string note { get; set; }
    }
}
