using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.model.request;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.authentication;
using WebApi.serrvice.authentication.model;

namespace WebApi.controllers.auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAuthentication m_authentication;
        public AuthController(IAuthentication authetication)
        {
            m_authentication = authetication;
        }
        //login user
        [HttpPost("login")]
        public DataRespond login([FromBody]UserRequest users)
        {
            DataRespond data = new DataRespond();
            try
            {
                Auth auth = new Auth();
                auth.madv = users.madv;
                auth.password = users.password;
                data = m_authentication.login(auth);
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        //logout user
        [HttpPost("logout")]
        public DataRespond logout([FromBody] Users users)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;

            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("checkToken")]
        public DataRespond checkToken([FromBody]TokenRequest tokenrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                if (m_authentication.checkToken(tokenrq))
                {
                    data.success = true;
                    data.message = "success";
                }
                else
                {
                    data.success = false;
                    data.message = "not found";
                }
            }
            catch (Exception e)
            {
                data.error = e;
                data.success = false;
                data.message = e.Message;
            }
            return data;
        }

        //refresh token
        public async Task<DataRespond> refreshTokenAsync(string token)
        {
            DataRespond data = new DataRespond();
            try
            {
                //var rt = await HttpContext.Authentication.GetTokenAsync("refresh_token");
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }

            return data;
        }
    }
}