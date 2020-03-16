using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AdhererClassLib.area.request
{
    public class UserMoveRequest
    {
        public int usid { get; set; }
        public IFormFile filereview { get; set; }
        public IFormFile tranfer { get; set; }
        public  string addresstogo { get; set; }
    }
}
