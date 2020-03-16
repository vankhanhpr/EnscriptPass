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
using WebApi.model.roles;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;

namespace WebApi.controllers.admin
{
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdFileController : Controller
    {
        private IAdFileResponsitory m_adFileResponsitory;
        private IHostingEnvironment m_hostingEnvironment;
        public AdFileController(IAdFileResponsitory adFileResponsitory, IHostingEnvironment hostingEnvironment)
        {
            m_adFileResponsitory = adFileResponsitory;
            m_hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("getFileByUsId")]
        public DataRespond getFileByUsId(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adFileResponsitory.getFileByUsid(id);
                data.message = "success";
            }
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        [HttpPost("updateFile")]
        public async Task<DataRespond> updateFileAsync([FromForm]FileRequest filerq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Files file = new Files();
                Boolean boole = true;
                if (filerq.fileid != -1)
                {
                    boole = true;
                    file = m_adFileResponsitory.getFileById(filerq.fileid); 
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
                    var y = deleteCard(file.card);
                    file.card = await uploadCard(filerq.card);
                }
                if (filerq.decision != null)
                {
                    var y = deleteDecision(file.decision);
                    file.decision = await uploadDecision(filerq.decision);
                }
                file.usid = filerq.usid;
                file.bangcap = filerq.bangcap;
                file.lyluanct = filerq.lyluanct;
                file.donvi = filerq.donvi;
                file.cbid = filerq.cbid;
                file.titleid = filerq.titleid;
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

                m_adFileResponsitory.updateFile(file, boole);
                data.success = true;
                data.message = "Update success!";
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        //add avatar
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

        //add card
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
        public async Task<string> deleteCard(string file)
        {
            //delete old picture
            string webRootPath = m_hostingEnvironment.WebRootPath;
            string contentRootPath = m_hostingEnvironment.ContentRootPath;
            var file1 = System.IO.Path.Combine(webRootPath, "card/" + file);
            System.IO.File.Delete(file1);//delete in forder
            return "success";
        }
        //add decision
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
        public async Task<string> deleteDecision(string file)
        {
            //delete old picture
            string webRootPath = m_hostingEnvironment.WebRootPath;
            string contentRootPath = m_hostingEnvironment.ContentRootPath;
            var file1 = System.IO.Path.Combine(webRootPath, "decision/" + file);
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