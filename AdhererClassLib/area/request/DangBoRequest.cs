using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class DangBoRequest
    {
        public int dbid { get; set; }
        public int tructhuoc { get; set; }
        public string tendb { get; set; }
        public int active { get; set; }
        public string ngaythanhlap { get; set; }
    }
}
