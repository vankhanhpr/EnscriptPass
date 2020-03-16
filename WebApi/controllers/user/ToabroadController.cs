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
    public class ToabroadController : Controller
    {
        private IToabroadResponsitory m_toabroadResponsitory;
        public ToabroadController(IToabroadResponsitory toabroadResponsitory)
        {
            m_toabroadResponsitory = toabroadResponsitory;
        }
        [HttpGet("getToabroadByFileId")]
        public DataRespond getToAbroadByUserId(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_toabroadResponsitory.getToabroadByFileId(id);
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpPost("insertToaBroad")]
        public DataRespond insertToabroad([FromBody] ABroadRequest aBroadRequest)
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
                toabroad.active = true;
                toabroad.status = true;
                toabroad.createday = DateTime.Now;

                m_toabroadResponsitory.insertToabroad(toabroad);
                data.success = true;
                data.message = "insert success";
                data.data = m_toabroadResponsitory.findToabroadById(toabroad.brid);
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;

        }

        [HttpGet("getToaBroadById")]
        public DataRespond getToabroadById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_toabroadResponsitory.findToabroadById(id);
            }
            catch (Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpPost("updateToaBbroad")]
        public DataRespond updateToabroad([FromBody]ABroadRequest aBroadRequest)
        {
            DataRespond data = new DataRespond();
            try
            {
                Toabroad toabroad = m_toabroadResponsitory.findToabroadById(aBroadRequest.brid);
                toabroad.noiden = aBroadRequest.noiden;
                toabroad.lydo = aBroadRequest.lydo;
                DateTime daytogo = DateTime.ParseExact(aBroadRequest.thoigiandi, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toabroad.thoigiandi = daytogo;
                DateTime daytoreturn = DateTime.ParseExact(aBroadRequest.thoigiantrove, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                toabroad.thoigiantrove = daytoreturn;

                data.success = true;
                data.message = "update success";
                m_toabroadResponsitory.updateToabroad(toabroad);
                data.data = m_toabroadResponsitory.findToabroadById(toabroad.brid);
            }
            catch (Exception e)
            {
                data.message = e.Message;
                data.success = false;
                data.error = e;
            }
            return data;
        }

        [HttpGet("deleteToaBroad")]
        public DataRespond deleteToabroad(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                m_toabroadResponsitory.deleteToabroad(id);
                data.message = "delete success";
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