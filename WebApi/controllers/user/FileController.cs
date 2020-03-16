using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.model.iformfile;
using WebApi.model.request;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.user.interfaces;

namespace WebApi.controllers.user
{
    [Authorize ]
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : Controller
    {
        private IHostingEnvironment m_hostingEnvironment;
        private IFileResponsitory m_fileResponsitory;
        public FileController(IFileResponsitory fileResponsitory, IHostingEnvironment hostingEnvironment)
        {
            m_hostingEnvironment = hostingEnvironment;
            m_fileResponsitory = fileResponsitory;
        }

        [HttpGet("getFileByUserId")]
        public dynamic getFielByUserId(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_fileResponsitory.getFileByUserId(id);
                data.message = "success";
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("updateFile")]
        public async Task<DataRespond> insertFileAsync([FromForm]FileRequest filerq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Files file = new Files();
                Boolean boole = true;
                if (filerq.fileid != -1)
                {
                    boole = true;
                    file = m_fileResponsitory.findFileById(filerq.fileid);
                }
                else
                {
                    boole = false;
                    file.createday = DateTime.Now;
                }
                if (filerq.avatar != null)
                {
                    var x = deleteFileImg(file.avatar);
                    file.avatar = await uploadFileImg(filerq.avatar);
                }
                if (filerq.card != null)
                {
                    file.card = await uploadCard(filerq.card);
                }
                if (filerq.decision != null)
                {
                    file.decision = await uploadDecision(filerq.decision);
                }
                // file.fileid = filerq.fileid;
                file.usid = filerq.usid;
                file.donvi = filerq.donvi;
                DateTime bd = DateTime.ParseExact(filerq.ngaythangnamsinh, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                file.ngaythangnamsinh = bd;
                file.hotendangdung = filerq.hotendangdung;
                file.hotenkhaisinh = filerq.hotenkhaisinh;
                file.gioitinh = filerq.gioitinh == 0 ? true : false;
                file.dantoc = filerq.dantoc;
                file.tongiao = filerq.tongiao;
                file.nghenghiep = filerq.nghenghiep;
                DateTime ngayvaodangct = DateTime.ParseExact(filerq.ngayvaodangct, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                file.ngayvaodangct = ngayvaodangct;
                DateTime ngayvaodangdb = DateTime.ParseExact(filerq.ngayvaodangdb, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                file.ngayvaodangdb = ngayvaodangdb;
                DateTime ngayvaodangdoan = DateTime.ParseExact(filerq.ngayvaodoan, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                file.ngayvaodoan = ngayvaodangdoan;
                file.trinhdovanhoa = filerq.trinhdovanhoa;
                file.chuyenmon = filerq.chuyenmon;
                file.bangcap = filerq.bangcap;
                file.lyluanct = filerq.lyluanct;
                file.quequan = filerq.quequan;
                file.noicutru = filerq.noicutru;
                file.matp = filerq.matp;
                file.maqh = filerq.maqh;
                file.xaid = filerq.xaid;
                file.solylich = filerq.solylich;
                file.updateday = DateTime.Now;
                file.sdt = filerq.sdt;
                file.email = filerq.email;
                file.cmnd = filerq.cmnd;
                file.noicapcmnd = filerq.noicapcmnd;
                DateTime ngaycmnd = DateTime.ParseExact(filerq.daycmnd, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                file.daycmnd = ngaycmnd;
                file.hokhauthuongtru = filerq.hokhauthuongtru;
                file.honnhan = filerq.honnhan == 0 ? true : false;
                file.suckhoe = filerq.suckhoe;

                m_fileResponsitory.updateFile(file, boole);
                data.success = true;
                data.message = "Update success!";
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }

            return data;
        }

        public async Task<string> uploadCard(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return "";
            var temp = file.GetFilename().Split(".");
            var nameimgmain = RandomString(10) + "." + temp[1];
            var fpath = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/card",
                        nameimgmain);//post image to forder 
            using (var stream = new FileStream(fpath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return nameimgmain;
        }

        public async Task<string> uploadDecision(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return "";
            var temp = file.GetFilename().Split(".");
            var nameimgmain = RandomString(10) + "." + temp[1];
            var fpath = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/decision",
                        nameimgmain);//post image to forder 
            using (var stream = new FileStream(fpath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return nameimgmain;
        }

        public async Task<string> uploadFileImg(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return "";
            var temp = file.GetFilename().Split(".");
            var nameimgmain = RandomString(10) + "." + temp[1];
            var fpath = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/images/user",
                        nameimgmain);//post image to forder 
            using (var stream = new FileStream(fpath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return nameimgmain;
        }
        public async Task<string> deleteFileImg(string file)
        {
            //delete old picture
            string webRootPath = m_hostingEnvironment.WebRootPath;
            string contentRootPath = m_hostingEnvironment.ContentRootPath;
            var file1 = System.IO.Path.Combine(webRootPath, "images/user/" + file);
            System.IO.File.Delete(file1);//delete in forder
            return "success";
        }

        //random image 
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "abcdefghiklmnopqrstwz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}