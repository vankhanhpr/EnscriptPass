using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class TokenRequest
    {
        public string token { get; set; }
        public int usid { get; set; }
        public int roleid { get; set; }
    }
}
