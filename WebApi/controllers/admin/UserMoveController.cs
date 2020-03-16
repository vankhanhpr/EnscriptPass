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
    public class UserMoveController : Controller
    {
        private IHostingEnvironment m_hostingEnvironment;
        private IUserMoveResponsitory m_userMoveResponsitory;
        private IAdUserResponsitory m_adUserResponsitory;
        public UserMoveController(IUserMoveResponsitory userMoveResponsitory, IHostingEnvironment hostingEnvironment,IAdUserResponsitory adUserResponsitory)
        {
            m_userMoveResponsitory = userMoveResponsitory;
            m_hostingEnvironment = hostingEnvironment;
            m_adUserResponsitory = adUserResponsitory;
        }

        [HttpPost("insertUserMove")]
        public async Task<DataRespond> insertUserMoveAsync([FromForm] UserMoveRequest userMoveRequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                UserMove userMove = new UserMove();
                if (userMoveRequest.filereview != null)
                {
                    userMove.filereview = await uploadDecision(userMoveRequest.filereview);
                }
                if (userMoveRequest.tranfer != null)
                {
                    userMove.tranfer = await uploadDecision(userMoveRequest.tranfer);
                }
                userMove.usid = userMoveRequest.usid;
                userMove.createday = DateTime.Now;
                userMove.accept = true;
                userMove.addresstogo = userMoveRequest.addresstogo;

                data.success = true;
                data.message = "insert success";
                m_userMoveResponsitory.insertUserMove(userMove);
                var us = m_adUserResponsitory.getUserById(userMoveRequest.usid);
                //us.lydodi = 5;
                us.active = false;
                m_adUserResponsitory.updateUser(us);
                /* <option value="5">Chuyển đi</option>
                            <option value="4">Xin ra khỏi Đảng</option>
                            <option value="3">Xóa tên</option>
                            <option value="2">Khai trừ</option>
                            <option value="1">Từ trần</option>*/
            }
            catch (Exception e)
            {
                data.error= e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("getUserMoveByChiBo")]
        public DataRespond getUserMoveByChiBo(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_userMoveResponsitory.getUserByChiBo(id);
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("getUserByChiBo")]
        public DataRespond getUserByChiBo(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adUserResponsitory.getUserByChiBoId(id);
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

        [HttpGet("filterUserByBox")]
        public DataRespond filterUserByBox(string filter,int cbid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_userMoveResponsitory.filterUserByBox(filter,cbid);
            }
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        public async Task<string> uploadDecision(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return "";
            var temp = file.GetFilename().Split(".");
            var nameimgmain = RandomString(10) + "." + temp[1];
            var fpath = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/transfer",
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
            var file1 = System.IO.Path.Combine(webRootPath, "transfer/" + file);
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