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
    public class AdChiBoController : Controller
    {
        private IChiBoResponsitory m_chiBoResponsitory;
        public AdChiBoController(IChiBoResponsitory chiBoResponsitory)
        {
            m_chiBoResponsitory = chiBoResponsitory;
        }
        [HttpGet("getAllChiBo")]
        public DataRespond getAllChiBo()
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_chiBoResponsitory.getAllChiBo();
            }
            catch (Exception e)
            {
                data.error = e;
                data.success = false;
                data.message = e.Message;
            }
            return data;
        }

        [HttpPost("insertChiBo")]
        public DataRespond insertChiBo([FromBody]ChiBoRequest cb)
        {
            DataRespond data = new DataRespond();
            try
            {
                ChiBo chb = new ChiBo();
                chb.tencb = cb.tencb;
                chb.dbid = cb.dbid;
                chb.active = cb.active == 0 ? true : false;
                DateTime ngaytl = DateTime.ParseExact(cb.ngaythanhlap, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                chb.ngaythanhlap = ngaytl;
                chb.createday = DateTime.Now;

                data.success = true;
                m_chiBoResponsitory.insertChoBo(chb);
                data.message = "Insert success!";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpPost("updateChiBo")]
        public DataRespond updateChiBo(ChiBoRequest cb)
        {
            DataRespond data = new DataRespond();
            try
            {
                ChiBo chb = m_chiBoResponsitory.getChiBoById(cb.cbid);
                chb.cbid = cb.cbid;
                chb.tencb = cb.tencb;
                chb.dbid = cb.dbid;
                chb.active = cb.active == 0 ? true : false;
                DateTime ngaytl = DateTime.ParseExact(cb.ngaythanhlap, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                chb.ngaythanhlap = ngaytl;

                data.success = true;
                m_chiBoResponsitory.updateChiBo(chb);

            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getChiBoByDb")]
        public DataRespond getChiBoByDb(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_chiBoResponsitory.getChiBoByDB(id);
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

        [HttpGet("getChiBoById")]
        public DataRespond getChiBoById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_chiBoResponsitory.getChiBoById(id);
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

        [HttpGet("searchChiBo")]
        public DataRespond searchChiBo(string filter,int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "search success";
                data.data = m_chiBoResponsitory.searchChiBo(filter,id);
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