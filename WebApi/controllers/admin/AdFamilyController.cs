using System;
using System.Collections.Generic;
using System.Globalization;
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
    public class AdFamilyController : Controller
    {
        private IAdFamilyResponsitory m_adFamilyResponsitory;

        public AdFamilyController(IAdFamilyResponsitory adFamilyResponsitory)
        {
            m_adFamilyResponsitory = adFamilyResponsitory;
        }

        [HttpGet("getFamilies")]
        public DataRespond getFamilies(int fileid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_adFamilyResponsitory.getAllFamily(fileid);
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpPost("insertFamily")]
        public DataRespond insertFamily([FromBody]FamilyRequest fmlrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Family fml = new Family();
                fml.name = fmlrq.name;
                fml.fileid = fmlrq.fileid;
                fml.quanhe = fmlrq.quanhe;
                fml.lichsuchinhtri = fmlrq.lichsuchinhtri;
                fml.hoancanhkinhte = fmlrq.hoancanhkinhte;
                fml.nghenghiep = fmlrq.nghenghiep;
                DateTime bd = DateTime.ParseExact(fmlrq.birthday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                fml.birthday = bd;
                fml.updateday = DateTime.Now;
                m_adFamilyResponsitory.insertFamily(fml);
                data.success = true;
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

        [HttpGet("getFmlById")]
        public DataRespond getFamilyById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adFamilyResponsitory.findFamilyById(id);
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
        
        [HttpPost("updateFamily")]
        public DataRespond updateFamily(FamilyRequest fmlrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Family fml = m_adFamilyResponsitory.findFamilyById(fmlrq.fmlid);
                fml.name = fmlrq.name;
                fml.lichsuchinhtri = fmlrq.lichsuchinhtri;
                fml.quanhe = fmlrq.quanhe;
                fml.nghenghiep = fmlrq.nghenghiep;
                fml.nghenghiep = fmlrq.nghenghiep;
                DateTime bd = DateTime.ParseExact(fmlrq.birthday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                fml.birthday = bd;
                m_adFamilyResponsitory.updateFamily(fml);
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

        [HttpGet("deleteFml")]
        public DataRespond deleteFml(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                m_adFamilyResponsitory.deleteFamily(id);
                data.message = "delete success";
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