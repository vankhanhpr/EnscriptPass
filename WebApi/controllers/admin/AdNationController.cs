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
    public class AdNationController : Controller
    {
        private INationResponsitory m_nationResponsitory;
        public AdNationController(INationResponsitory nationResponsitory)
        {
            m_nationResponsitory = nationResponsitory;
        }

        [HttpGet("getNations")]
        public DataRespond getNations()
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_nationResponsitory.getNations();
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
    }
}