using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.model.request
{
    public class FileRequest
    {
        public int fileid { get; set; }
        public int usid { get; set; }
        public int donvi { get; set; }
        public string ngaythangnamsinh { get; set; }
        public string hotendangdung { get; set; }
        public string hotenkhaisinh { get; set; }
        public int gioitinh { get; set; }
        public int cbid { get; set; }
        public int titleid { get; set; }
        public int dantoc { get; set; }
        public string tongiao { get; set; }
        public string nghenghiep { get; set; }
        public string ngayvaodangdb { get; set; }
        public string ngayvaodangct { get; set; }
        public string ngayvaodoan { get; set; }
        public string trinhdovanhoa { get; set; }
        public string chuyenmon { get; set; }
        public string quequan { get; set; }
        public string noicutru { get; set; }
        public string matp { get; set; }
        public string maqh { get; set; }
        public string xaid { get; set; }
        public string solylich { get; set; }
        public DateTime createday { get; set; }
        public DateTime updateday { get; set; }
        public string sdt { get; set; }
        public string email { get; set; }
        public IFormFile avatar { get; set; }

        public string cmnd { get; set; }
        public string daycmnd { get; set; }
        public string noicapcmnd { get; set; }
        public string hokhauthuongtru { get; set; }
        public int honnhan { get; set; }
        public string suckhoe { get; set; }

        public IFormFile card { get; set; }
        public IFormFile decision { get; set; }
        public int bangcap { get; set; }
        public int lyluanct { get; set; }
    }
}
