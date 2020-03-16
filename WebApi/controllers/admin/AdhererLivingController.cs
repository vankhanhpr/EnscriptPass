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
    public class AdhererLivingController : Controller
    {
        private IAdhererLivingResponsitory m_adhererLivingResponsitory;
        private IHostingEnvironment m_hostingEnvironment;
        public AdhererLivingController (IAdhererLivingResponsitory adhererLivingResponsitory, IHostingEnvironment hostingEnvironment)
        {
            m_adhererLivingResponsitory = adhererLivingResponsitory;
            m_hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("insertAdhererLiving")]
        public async Task<DataRespond> insertAdhererlivingAsync([FromForm]AdhererlivingRequest adhererlivingRequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                AdhererLiving adhererLiving = new AdhererLiving();

                if (adhererlivingRequest.file != null)
                {
                    adhererLiving.namefile = await uploadDocument(adhererlivingRequest.file);
                }
                adhererLiving.title = adhererlivingRequest.title;
                adhererLiving.note = adhererlivingRequest.note;
                adhererLiving.cbid = adhererlivingRequest.cbid;
                DateTime dayevent = DateTime.ParseExact(adhererlivingRequest.dayevent, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                adhererLiving.dayevent = dayevent;
                adhererLiving.createday = DateTime.Now;
                m_adhererLivingResponsitory.insertAdhererLiving(adhererLiving);
                data.success = true;
                data.message = "insert success";
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("updateAdhererLiving")]
        public async Task<DataRespond> updateAdhererLivingAsync([FromForm]AdhererlivingRequest adhererlivingRequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                AdhererLiving adhererLiving = m_adhererLivingResponsitory.getAdhererLivingById(adhererlivingRequest.livid);
                if (adhererlivingRequest.file != null)
                {
                    var x = deleteDocument(adhererLiving.namefile);
                    adhererLiving.namefile = await uploadDocument(adhererlivingRequest.file);
                }
                adhererLiving.title = adhererlivingRequest.title;
                adhererLiving.note = adhererlivingRequest.note;
                DateTime dayevent = DateTime.ParseExact(adhererlivingRequest.dayevent, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                adhererLiving.dayevent = dayevent;
                m_adhererLivingResponsitory.updateAdhererLiving(adhererLiving);
                data.success = true;
                data.message = "update success";
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("deleteAdhererLiving")]
        public DataRespond deleteAdhererLiving(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                AdhererLiving adherer = m_adhererLivingResponsitory.getAdhererLivingById(id);
                var x = deleteDocument(adherer.namefile);
                m_adhererLivingResponsitory.deleteAdhererLiving(adherer);
                data.success = true;
                data.message = "delete success";
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("getAllAdhererLiving")]
        public DataRespond getAllAdhererLiving(int cbid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adhererLivingResponsitory.getAllAdhererLiving(cbid);
                data.message = "success";
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpGet("getAllAdhererLivingById")]
        public DataRespond getAllAdhererLivingById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adhererLivingResponsitory.getAdhererLivingById(id);
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

        public async Task<string> uploadDocument(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return "";
            var temp = file.GetFilename().Split(".");
            var nameimgmain = RandomString(10) + "." + temp[1];
            var fpath = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/document",
                        nameimgmain);//post image to forder 
            using (var stream = new FileStream(fpath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return nameimgmain;
        }
        public async Task<string> deleteDocument(string file)
        {
            //delete old picture
            string webRootPath = m_hostingEnvironment.WebRootPath;
            string contentRootPath = m_hostingEnvironment.ContentRootPath;
            var file1 = System.IO.Path.Combine(webRootPath, "document/" + file);
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