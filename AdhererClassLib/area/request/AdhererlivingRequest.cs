using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class AdhererlivingRequest
    {
        public int livid { get; set; }
        public string title { get; set; }
        public string dayevent { get; set; }
        public string note { get; set; }
        public IFormFile file { get; set; }
        public int cbid { get; set; }
    }
}
