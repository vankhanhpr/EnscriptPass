using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AdhererClassLib.area.request;
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
    public class AdAbroadController : Controller
    {
        private IAdToabroadResponsitory m_adToabroadResponsitory;
        public AdAbroadController (IAdToabroadResponsitory adToabroadResponsitory)
        {
            m_adToabroadResponsitory = adToabroadResponsitory;
        }
        [HttpGet("getToabroadByFileId")]
        public DataRespond getToAbroadByUserId(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_adToabroadResponsitory.getToabroadByFileId(id);
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("insertAbroad")]
        public DataRespond insertAbroad([FromBody]ABroadRequest aBroadRequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                Toabroad toabroad = new Toabroad();
                toabroad.fileid = aBroadRequest.fileid;
                toabroad.noiden = aBroadRequest.noiden;
                toabroad.lydo = aBroadRequest.lydo;
                DateTime daytogo = DateTime.ParseExact(aBroadRequest.thoigiandi, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toabroad.thoigiandi = daytogo;
                DateTime daytoreturn = DateTime.ParseExact(aBroadRequest.thoigiantrove, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toabroad.thoigiantrove = daytoreturn;
                toabroad.active = false;
                toabroad.status = true;
                toabroad.createday = DateTime.Now;
                toabroad.accept = true;

                data.success = true;
                m_adToabroadResponsitory.insertToabroad(toabroad);
                data.message = "insert success";
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getAbroadById")]
        public DataRespond getAbroadById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_adToabroadResponsitory.findToabroadById(id);
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpPost("updateAbroad")]
        public DataRespond updateAbroad([FromBody]ABroadRequest aBroadRequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                Toabroad toabroad = m_adToabroadResponsitory.findToabroadById(aBroadRequest.brid);
                toabroad.noiden = aBroadRequest.noiden;
                toabroad.lydo = aBroadRequest.lydo;
                DateTime daytogo = DateTime.ParseExact(aBroadRequest.thoigiandi, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toabroad.thoigiandi = daytogo;
                DateTime daytoreturn = DateTime.ParseExact(aBroadRequest.thoigiantrove, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toabroad.thoigiantrove = daytoreturn;

                data.success = true;
                data.message = "update success";
                m_adToabroadResponsitory.updateToabroad(toabroad);
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.success = false;
                data.error = e;
            }
            return data;
        }

        [HttpGet("deleteAbroad")]
        public DataRespond deleteAbroad(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                m_adToabroadResponsitory.deleteToabroad(id);
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
        [HttpPost("getUserByCbId")]
        public DataRespond getUserByCbId(AbroadFilter abroadFilter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_adToabroadResponsitory.getUseByCbid(abroadFilter);

            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpPost("filterByBox")]
        public DataRespond filterByBox(AbroadFilter abroadFilter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "filter success";
                data.data = m_adToabroadResponsitory.filterAbroadByBox(abroadFilter);
            }
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        [HttpGet("acceptToaBroad")]
        public DataRespond acceptAbroad(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                Toabroad toabroad = m_adToabroadResponsitory.findToabroadById(id);
                toabroad.accept = true;
                m_adToabroadResponsitory.updateToabroad(toabroad);
                data.success = true;
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
    }
}