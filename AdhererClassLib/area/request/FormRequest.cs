using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class FormRequest
    {
        public int formid { get; set; }
        public string nameform { get; set; }
        public IFormFile file { get; set; }
        public string note { get; set; }
        public int type { get; set; }
        public int cbid { get; set; }
    }
}
