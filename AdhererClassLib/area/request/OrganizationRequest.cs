using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class OrganizationRequest
    {
        public int ogid { get; set; }
        public string nameog { get; set; }
        public int active { get; set; }
        public string createday { get; set; }
    }
}
