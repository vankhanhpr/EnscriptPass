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
    public class AdDangBoController : Controller
    {
        private IDangBoResponsitory m_dangBoResponsitory;
        public AdDangBoController(IDangBoResponsitory dangBoResponsitory)
        {
            m_dangBoResponsitory = dangBoResponsitory;
        }
        [HttpGet("getAllDangBo")]
        public DataRespond getAllDangBo()
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_dangBoResponsitory.getAllDangBo();
            }
            catch (Exception e)
            {
                data.error = e;
                data.success = false;
                data.message = e.Message;
            }
            return data;
        }

        [HttpPost("insertDangBo")]
        public DataRespond insertDangBo(DangBoRequest db)
        {
            DataRespond data = new DataRespond();
            try
            {
                DangBo dangbo = new DangBo();
                
                dangbo.tendb = db.tendb;
                dangbo.active = db.active == 0 ? true : false;
                dangbo.tructhuoc = db.tructhuoc;
                DateTime ngaytl = DateTime.ParseExact(db.ngaythanhlap, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                dangbo.ngaythanhlap = ngaytl;
                dangbo.createday = DateTime.Now;
                data.success = true;
                m_dangBoResponsitory.insertDangBo(dangbo);
            }
            catch(Exception e)
            {
                data.success = false;
                data.data = e;
                data.message = e.Message;
            }
            return data;
        }
        [HttpPost("updateDangBo")]
        public DataRespond updateDangBo([FromBody]DangBoRequest db)
        {
            DataRespond data = new DataRespond();
            try
            {
                DangBo dangbo = m_dangBoResponsitory.getDangBoById(db.dbid);
                dangbo.dbid = db.dbid;
                dangbo.tendb = db.tendb;
                dangbo.active = db.active == 0 ? true : false;
                dangbo.tructhuoc = db.tructhuoc;
                DateTime ngaytl = DateTime.ParseExact(db.ngaythanhlap, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                dangbo.ngaythanhlap = ngaytl;
                data.success = true;
                m_dangBoResponsitory.updateDangBo(dangbo);
            }
            catch (Exception e)
            {
                data.success = false;
                data.data = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getDangBoById")]
        public DataRespond getDangBoById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_dangBoResponsitory.getDangBoById(id);
                data.message = "success";
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getDangBoNotAttached")]
        public DataRespond getDangBoNotAttached(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_dangBoResponsitory.getDangBoNotAttached(id);
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("searchDangBo")]
        public DataRespond searchDangBo(string filter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_dangBoResponsitory.searchDangBo(filter);
                data.message = "search success";
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