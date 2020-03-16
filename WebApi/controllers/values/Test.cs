using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.controllers.values
{
    public class Test
    {
        [Key]
        public int testId { get; set; }
        public string testname { get; set; }
    }
}
