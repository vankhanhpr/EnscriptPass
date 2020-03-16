using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.model.request;
using WebApi.model.roles;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;

namespace WebApi.controllers.admin
{
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdOrganizationController : Controller
    {
        private IOrganizationResponsitory m_organizationResponsitory;
        public AdOrganizationController(IOrganizationResponsitory organizationResponsitory)
        {
            m_organizationResponsitory = organizationResponsitory;
        }
        [HttpGet("getAllOrganization")]
       public DataRespond getAllOrganization()
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_organizationResponsitory.getAllOrganization();
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

        [HttpPost("insertOrganization")]
        public DataRespond insertOrganization([FromBody] OrganizationRequest ogreq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Organization og = new Organization();
                og.nameog = ogreq.nameog;
                og.active = ogreq.active == 0 ? true : false;
                og.createday= DateTime.Now;
                data.success = true;
                m_organizationResponsitory.insertOrganization(og);
            }
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }
        [HttpGet("getOgById")]
        public DataRespond getOrganizationById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_organizationResponsitory.findOrganizationById(id);
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

        [HttpPost("updateOrganization")]
        public DataRespond updateOrganization([FromBody] OrganizationRequest ogrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Organization og = m_organizationResponsitory.findOrganizationById(ogrq.ogid);
                og.ogid = ogrq.ogid;
                og.nameog = ogrq.nameog;
                og.active = ogrq.active == 0 ? true : false;
                m_organizationResponsitory.updateOrganization(og);
                data.success = true;
                data.message = "update success!";
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("searchOriganization")]
        public DataRespond searchOriganization(string filter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "search success";
                data.data = m_organizationResponsitory.searchOrganization(filter);
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