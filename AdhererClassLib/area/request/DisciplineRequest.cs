using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class DisciplineRequest
    {
        public int dsid { get; set; }
        public int fileid { get; set; }
        public string noidung { get; set; }
        public string ghichu { get; set; }
        public DateTime updateday { get; set; }
        public string daycreate { get; set; }
        public Boolean approved { get; set; }
        public Boolean active { get; set; }
        public string donvi { get; set; }
    }
}
