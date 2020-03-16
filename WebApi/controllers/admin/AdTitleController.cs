using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.model.roles;
using WebApi.serrvice.admin.interfaces;

namespace WebApi.controllers.admin
{
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdTitleController : Controller
    {
        private ITitleResponsitory m_titleResponsitory;
        public AdTitleController(ITitleResponsitory titleResponsitory)
        {
            m_titleResponsitory = titleResponsitory;
        }
        [HttpGet("getAllTitle")]
        public DataRespond getAllTitle()
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_titleResponsitory.getAllTitle();
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
    }
}