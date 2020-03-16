using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class FamilyRequest
    {
        public int fmlid { get; set; }
        public int fileid { get; set; }
        public string quanhe { get; set; }
        public string nghenghiep { get; set; }
        public string hoancanhkinhte { get; set; }
        public string lichsuchinhtri { get; set; }
        public string updateday { get; set; }
        public string name { get; set; }
        public string birthday { get; set; }
    }
}
