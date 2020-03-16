using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class ABroadRequest
    {
        public int brid { get; set; }
        public int fileid { get; set; }
        public string noiden { get; set; }
        public string lydo { get; set; }
        public string thoigiandi { get; set; }
        public string thoigiantrove { get; set; }
        public DateTime createday { get; set; }
        public int active { get; set; }
        public int status { get; set; }
    }
}
