using System;
using System.Collections.Generic;
using System.Globalization;
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
using WebApi.model.request;
using WebApi.model.roles;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;

namespace WebApi.controllers.admin
{
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdUserController : Controller
    {
        private IHostingEnvironment m_hostingEnvironment;
        private IAdUserResponsitory m_userResponsitory;
        public AdUserController(IAdUserResponsitory userResponsitory, IHostingEnvironment hostingEnvironment)
        {
            m_userResponsitory = userResponsitory;
            m_hostingEnvironment = hostingEnvironment;
        }
        [HttpGet("getAllUser")]
        public DataRespond getAllUser(int page, int pagesize)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_userResponsitory.getAllUser(page, pagesize);
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getUserByChiBo")]
        public DataRespond getUserByCBId(int id, string fromday, string endday)
        {
            DataRespond data = new DataRespond();
            try
            {
                DateTime frday = DateTime.ParseExact(fromday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                DateTime eday = DateTime.ParseExact(endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                data.success = true;
                data.data = m_userResponsitory.getUserByChiBo(id, frday, eday);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }


        [HttpPost("insertUser")]
        public DataRespond insertUser([FromBody]UserRequest usrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                var uscheck = m_userResponsitory.getUserByMaDv(usrq.madv);
                if (uscheck != null)
                {
                    data.success = false;
                    data.message = "Mã Đảng viên đã được đăng kí tài khoản trước đó!";
                    return data;
                }

                Users user = new Users();

                user.madv = usrq.madv;
                //user.cbid = usrq.cbid;
                //user.titleid = usrq.titleid;
                user.roleid = usrq.roleid;
                user.active = usrq.active == 0 ? true : false;
                user.createday = DateTime.Now;
                DateTime udday = DateTime.ParseExact(usrq.ngaydenchibo, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                user.ngaydenchibo = udday;
                user.password = usrq.password;
                //user.lydoden = usrq.lydoden;
                //user.lydodi = -1;//nothing
                //user.cbidold = -1;//nothing
                user.accept = false;
                user.noisinhhoatcu = usrq.noisinhhoatcu;

                m_userResponsitory.insertUser(user);
                data.success = true;
                data.message = "insert success";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getDetalUser")]
        public DataRespond getDetailUser(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_userResponsitory.getUserById(id);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("updateUser")]
        public DataRespond updateUser([FromBody]UserRequest usrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Users user = m_userResponsitory.getUserById(usrq.usid);
               
                //if (user.cbid != usrq.cbid)
                //{
                //    user.lydoden = 1;
                //}
                user.usid = usrq.usid;
                user.madv = usrq.madv;
                user.roleid = usrq.roleid;
                user.active = usrq.active == 0 ? true : false;
                user.noisinhhoatcu = usrq.noisinhhoatcu;

                DateTime udday = DateTime.ParseExact(usrq.ngaydenchibo, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                user.ngaydenchibo = udday;
                if (usrq.password != "")
                {
                    user.password = usrq.password;
                }

                data.success = true;
                m_userResponsitory.updateUser(user);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("blockUser")]
        public DataRespond blockUser([FromBody]UserRequest usrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Users user = m_userResponsitory.getUserById(usrq.usid);
                //user.lydodi = usrq.lydodi;
                user.active = false;

                m_userResponsitory.updateUser(user);
                data.success = true;
                data.message = "block success";
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("unlockUser")]
        public DataRespond unblockUser(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                Users user = m_userResponsitory.getUserById(id);
                user.active = true;
                //user.lydodi = -1;

                m_userResponsitory.updateUser(user);
                data.success = true;
                data.message = "unlock success";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getUserByRole")]
        public DataRespond getUserByRole(int role)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_userResponsitory.getUserByRole(role);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getUserByActive")]
        public DataRespond getUserByActive(int active)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_userResponsitory.getUserByActive(active);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpPost("filterUserByBox")]
        public DataRespond filterByBox([FromBody]Filter filter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_userResponsitory.getUserByBox(filter.filter);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.error = e;
                data.success = false;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("acceptUser")]
        public DataRespond acceptUser(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                Users us = m_userResponsitory.getUserById(id);
                us.accept = us.accept ? false : true;
                data.data = us.accept;
                m_userResponsitory.updateUser(us);
                data.message = "accept success";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getUserByChiBoIdForFilter")]
        public DataRespond getUserByChiBoId(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_userResponsitory.getUserByChiBoId(id);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("getArmorial")]
        public DataRespond getArmorial(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_userResponsitory.getArmorial(id);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("moveUser")]
        public async Task<DataRespond> moveUserAsync([FromForm]UserRequest usrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                var uscheck = m_userResponsitory.getUserByMaDv(usrq.madv);
                if (uscheck != null)
                {
                    data.success = false;
                    data.message = "Mã Đảng viên đã được đăng kí tài khoản trước đó!";
                    return data;
                }
                
                Users user = new Users();
                if (usrq.giaygioithieu != null)
                {
                    user.giaygioithieu = await uploadDecision(usrq.giaygioithieu);
                }
                user.madv = usrq.madv;
                //user.cbid = usrq.cbid;
                //user.titleid = usrq.titleid;
                user.roleid = usrq.roleid;
                user.active = usrq.active == 0 ? true : false;
                user.createday = DateTime.Now;
                DateTime udday = DateTime.ParseExact(usrq.ngaydenchibo, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                user.ngaydenchibo = udday;
                user.password = usrq.password;
                //user.lydoden = usrq.lydoden;
                //user.lydodi = -1;//nothing
                //user.cbidold = -1;//nothing
                user.accept = false;
                user.noisinhhoatcu = usrq.noisinhhoatcu;

                m_userResponsitory.insertUser(user);
                data.success = true;
                data.message = "insert success";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpPost("transferUser")]
        public DataRespond transferUser([FromForm]UserMove userMove)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "transfer success";
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpPost("getUserMoved")]
        public DataRespond getUserMoved(FilterUser filterUser)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_userResponsitory.getUserMoved(filterUser);
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
                        Directory.GetCurrentDirectory(), "wwwroot/decision",
                        nameimgmain);//post image to forder 
            using (var stream = new FileStream(fpath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return nameimgmain;
        }
        public async Task<Boolean> deleteDecision(string file)
        {
            try
            {
                //delete old picture
                string webRootPath = m_hostingEnvironment.WebRootPath;
                string contentRootPath = m_hostingEnvironment.ContentRootPath;
                var file1 = System.IO.Path.Combine(webRootPath, "decision/" + file);
                System.IO.File.Delete(file1);//delete in forder
                return true;
            }
            catch(Exception e)
            {
                return false;
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