using System;
using System.Collections.Generic;
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
    public class AdFormController : Controller
    {
       
        private IHostingEnvironment m_hostingEnvironment;
        private IAdFormResponsitory m_adFormResponsitory;
        public AdFormController(IAdFormResponsitory adFormResponsitory, IHostingEnvironment hostingEnvironment)
        {
            m_adFormResponsitory = adFormResponsitory;
            m_hostingEnvironment = hostingEnvironment;
        }
        [HttpGet("getAllForms")]
        public DataRespond getForms(int type,int cbid)
        {
            //0 bieu mau
            //1 van ban den
            //2 van ban di
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_adFormResponsitory.getAllForm(type, cbid);
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }
        [HttpPost("insertForms")]
        public async Task<DataRespond> insertFormAsync([FromForm]FormRequest formrequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                Forms form = new Forms();
                if (formrequest.file != null)
                {
                    form.namefile = await uploadFile(formrequest.file);
                }
                form.nameform = formrequest.nameform;
                form.note = formrequest.note;
                form.updateday = DateTime.Now;
                form.active = true;
                form.type = formrequest.type;
                form.cbid = formrequest.cbid;

                m_adFormResponsitory.insertForm(form);
                data.success = true;
                data.message = "insert success";
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpGet("getFormById")]
        public DataRespond getFormById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_adFormResponsitory.findFormById(id);
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

     
        [HttpPost("updateForm")]
        public async Task<DataRespond> updateFormAsync([FromForm]FormRequest formrequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                Forms form = m_adFormResponsitory.findFormById(formrequest.formid);
                form.nameform = formrequest.nameform;
                form.note = formrequest.note;
                if (formrequest.file != null)
                {
                    var x = deleteFile(form.namefile);
                    form.namefile = await uploadFile(formrequest.file);
                }
                m_adFormResponsitory.updateForm(form);
                data.success = true;
                data.message = "update success";
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpGet("deleteForm")]
        public DataRespond deleteForm(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "delete success";
                Forms forms = m_adFormResponsitory.findFormById(id);
                var x = deleteFile(forms.namefile);
                m_adFormResponsitory.deleteForm(id);
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("searchForm")]
        public DataRespond searchForm(int type, int cbid,string filter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.data = m_adFormResponsitory.searchForms(type,cbid,filter);
                data.success = true;
                data.message = "search success";
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.success = false;
                data.error = e;
            }
            return data;
        }

        public async Task<string> uploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return "";
            var temp = file.GetFilename().Split(".");
            var nameimgmain = RandomString(10) + "." + temp[temp.Length-1];
            var fpath = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/files",
                        nameimgmain);//post image to forder 
            using (var stream = new FileStream(fpath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return nameimgmain;
        }
        public async Task<string> deleteFile(string file)
        {
            //delete old file
            string webRootPath = m_hostingEnvironment.WebRootPath;
            string contentRootPath = m_hostingEnvironment.ContentRootPath;
            var file1 = System.IO.Path.Combine(webRootPath, "files/" + file);
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