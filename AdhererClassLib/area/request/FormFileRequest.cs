using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AdhererClassLib.area.request
{
    public class FormFileRequest
    {
        public int fileid { get; set; }
        public int formfileid { get; set; }
        public IFormFile bantukiemdiem { get; set; }
        public IFormFile giaychungnhanboiduong { get; set; }
        public IFormFile nhanxetnguoihd { get; set; }
        public IFormFile nhanxetchibo { get; set; }
        public IFormFile quydinhketnap { get; set; }
    }
}
