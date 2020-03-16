using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class BonusRequest
    {
        public int bnid { get; set; }
        public int fileid { get; set; }
        public string noidung { get; set; }
        public string donvi { get; set; }
        public string ghichu { get; set; }
        public string daycreate { get; set; }
        public string updateday { get; set; }
    }
}
