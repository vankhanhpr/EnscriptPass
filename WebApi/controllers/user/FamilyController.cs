using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.model.request;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.user.interfaces;

namespace WebApi.controllers.user
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyController : Controller
    {
        private IFamilyResponsitory m_FamilyResponsitory;

        public FamilyController(IFamilyResponsitory FamilyResponsitory)
        {
            m_FamilyResponsitory = FamilyResponsitory;
        }

        [HttpGet("getFamilies")]
        public DataRespond getFamilies(int fileid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_FamilyResponsitory.getAllFamily(fileid);
            }
            catch (Exception e)
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
                m_FamilyResponsitory.insertFamily(fml);
                data.success = true;
                data.message = "success";
                data.data = m_FamilyResponsitory.findFamilyById(fml.fmlid);
            }
            catch (Exception e)
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
                data.data = m_FamilyResponsitory.findFamilyById(id);
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

        [HttpPost("updateFamily")]
        public DataRespond updateFamily(FamilyRequest fmlrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Family fml = m_FamilyResponsitory.findFamilyById(fmlrq.fmlid);
                fml.name = fmlrq.name;
                fml.lichsuchinhtri = fmlrq.lichsuchinhtri;
                fml.quanhe = fmlrq.quanhe;
                fml.nghenghiep = fmlrq.nghenghiep;
                fml.nghenghiep = fmlrq.nghenghiep;
                DateTime bd = DateTime.ParseExact(fmlrq.birthday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                fml.birthday = bd;
                m_FamilyResponsitory.updateFamily(fml);
                data.success = true;
                data.message = "update success";
                data.data = m_FamilyResponsitory.findFamilyById(fml.fmlid);
            }
            catch (Exception e)
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
               
                
                m_FamilyResponsitory.deleteFamily(id);
                data.message = "delete success";
                data.success = true;
            }
            catch (Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
                
            }
            return data;
        }
    }
}