using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdhererClassLib.area.request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.serrvice.user.interfaces;

namespace WebApi.controllers
{
    [Authorize ]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserResponsitory m_userResponsitory;
        public UserController(IUserResponsitory userResponsitory)
        {
            m_userResponsitory = userResponsitory;
        }
        
        [HttpGet("getUserByMadv")]
        public DataRespond getAllUser(string madv)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_userResponsitory.getUserByMaDv(madv);
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.error = e.Message;
            }
            return data;
        }
        [HttpPost("changePass")]
        public DataRespond changePass(PassChange passChange)
        {
            DataRespond data = new DataRespond();
            try
            {
                if (m_userResponsitory.changePass(passChange))
                {
                    data.success = true;
                    data.message = "change password success";
                }
                else
                {
                    data.success = false;
                }
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }

            return data;
        }
    }
}