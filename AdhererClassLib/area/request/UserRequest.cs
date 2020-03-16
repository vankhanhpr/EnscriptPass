using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class UserRequest
    {
        public int usid { get; set; }
        public string madv { get; set; }
        public string password { get; set; }

        public int cbid { get; set; }
        public string ngaydenchibo { get; set; }
        public string createday { get; set; }
        public int roleid { get; set; }
        public int titleid { get; set; }
        public int active { get; set; }
        public int lydoden { get; set; }
        public int lydodi { get; set; }

        public int cbidold { get; set; }

        public IFormFile giaygioithieu { get; set; }
        public Boolean accept { get; set; }
        public string noisinhhoatcu { get; set; }
    }
}
