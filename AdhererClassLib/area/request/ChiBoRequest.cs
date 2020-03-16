using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class ChiBoRequest
    {
        public int cbid { get; set; }
        public string tencb { get; set; }
        public int dbid { get; set; }
        public int active { get; set; }
        public string ngaythanhlap { get; set; }
    }
}
