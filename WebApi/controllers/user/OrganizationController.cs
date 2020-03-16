using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.serrvice.admin.interfaces;

namespace WebApi.controllers.user
{
    //authen
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : Controller
    {
        private IOrganizationResponsitory m_organizationResponsitory;
        public OrganizationController(IOrganizationResponsitory organizationResponsitory)
        {
            m_organizationResponsitory = organizationResponsitory;
        }
        [HttpGet("getAllOrg")]
        public DataRespond getOrg()
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_organizationResponsitory.getAllOrganization();

            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }
    }
}