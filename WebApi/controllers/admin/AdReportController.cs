using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdhererClassLib.area.request;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.serrvice.admin.interfaces;

namespace WebApi.controllers.admin
{
    //[Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdReportController : Controller
    {
        private IStatisticalResponsitory m_statisticalResponsitory;
        public AdReportController(IStatisticalResponsitory statisticalResponsitory)
        {
            m_statisticalResponsitory = statisticalResponsitory;
        }
        [HttpPost("getUserBonus")]
        public DataRespond getUserBonus(FilterUser filter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_statisticalResponsitory.getUserByBonus(filter);
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

        [HttpPost("getUserDesS")]
        public DataRespond getUserDes(FilterUser filter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_statisticalResponsitory.getUserByDesCr(filter);
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpPost("getUserToaBroad")]
        public DataRespond getUserToaBroad(FilterUser filter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_statisticalResponsitory.getUserToaBroad(filter);
            }
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        [HttpPost("filterUser")]
        public DataRespond filterUser(FilterUser filter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_statisticalResponsitory.filterUser(filter);
            }
    
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }
    }
}