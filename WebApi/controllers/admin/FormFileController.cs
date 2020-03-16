using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AdhererClassLib.area.main;
using AdhererClassLib.area.request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.model.iformfile;
using WebApi.model.roles;
using WebApi.serrvice.admin.interfaces;

namespace WebApi.controllers.admin
{
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class FormFileController : Controller
    {
        private IFormFileResponsitory m_formFileResponsitory;
        private IHostingEnvironment m_hostingEnvironment;
        public FormFileController(IFormFileResponsitory formFileResponsitory, IHostingEnvironment hostingEnvironment)
        {
            m_formFileResponsitory = formFileResponsitory;
            m_hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("getFormFileWidthChiBo")]
        public DataRespond getFormFileByChiBo(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_formFileResponsitory.getFileWidthIFormFile(id);
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("updateFormFile")]
        public async Task<DataRespond> insertFormFileAsync([FromForm]FormFileRequest formFileRequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                FormFile formFile = m_formFileResponsitory.getFormFileById(formFileRequest.formfileid);
                data.success = true;
                data.message = "update success";
                if (formFileRequest.giaychungnhanboiduong != null)
                {
                    deleteFile(formFile.giaychungnhanboiduong);
                    formFile.giaychungnhanboiduong = await uploadFile(formFileRequest.giaychungnhanboiduong);
                    m_formFileResponsitory.updateFormFile(formFile);
                    return data;
                }
                if (formFileRequest.bantukiemdiem != null)
                {
                    deleteFile(formFile.bantukiemdiem);
                    formFile.bantukiemdiem = await uploadFile(formFileRequest.bantukiemdiem);
                    m_formFileResponsitory.updateFormFile(formFile);
                    return data;
                }
                if (formFileRequest.nhanxetnguoihd != null)
                {
                    deleteFile(formFile.nhanxetnguoihd);
                    formFile.nhanxetnguoihd = await uploadFile(formFileRequest.nhanxetnguoihd);
                    m_formFileResponsitory.updateFormFile(formFile);
                    return data;
                }
                if (formFileRequest.nhanxetchibo != null)
                {
                    deleteFile(formFile.nhanxetchibo);
                    formFile.nhanxetchibo = await uploadFile(formFileRequest.nhanxetchibo);
                    m_formFileResponsitory.updateFormFile(formFile);
                    return data;
                }
                if (formFileRequest.quydinhketnap != null)
                {
                    deleteFile(formFile.quydinhketnap);
                    formFile.quydinhketnap = await uploadFile(formFileRequest.quydinhketnap);
                    m_formFileResponsitory.updateFormFile(formFile);
                    return data;
                }
            }
            catch (Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }


        [HttpGet("getOnlyFormFile")]
        public DataRespond getOnlyFormFile(int id) {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_formFileResponsitory.getOnlyFormFile(id);
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }




        public async Task<string> uploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return "";
            var temp = file.GetFilename().Split(".");
            var nameimgmain = RandomString(10) + "." + temp[1];
            var fpath = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/dangviendubi",
                        nameimgmain);//post image to forder 
            using (var stream = new FileStream(fpath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return nameimgmain;
        }
        public void deleteFile(string file)
        {
            //delete old picture
            try
            {
                string webRootPath = m_hostingEnvironment.WebRootPath;
                string contentRootPath = m_hostingEnvironment.ContentRootPath;
                var file1 = System.IO.Path.Combine(webRootPath, "dangviendubi/" + file);
                System.IO.File.Delete(file1);//delete in forder
            }
            catch
            {
            }
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