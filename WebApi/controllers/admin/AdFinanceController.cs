using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AdhererClassLib.area.main;
using AdhererClassLib.area.request;
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
    public class AdFinanceController : Controller
    {
        private IFinanceResponsitory m_financeResponsitory;
        public AdFinanceController(IFinanceResponsitory financeResponsitory)
        {
            m_financeResponsitory = financeResponsitory;
        }
        [HttpGet("getFinanceByStatus")]
        public  DataRespond getFinanceByStatus(int status,int cbid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "succss";
                data.data = m_financeResponsitory.getFinanceByStatus(status, cbid);
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.success = false;
                data.error = e;
            }
            return data;
        }

        [HttpPost("insertFinance")]
        public DataRespond insertFinance(FinanceRequest finance)
        {
            DataRespond data = new DataRespond();
            try
            {
                var fi = new Finance();
                fi.name = finance.name;
                fi.moneys = finance.moneys;
                fi.status = finance.status;
                fi.cbid = finance.cbid;
                fi.uscreate = finance.uscreate;
                fi.person = finance.person;
                DateTime daycr = DateTime.ParseExact(finance.createday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                fi.createday = daycr;
                data.success = true;
                data.message = "insert succeses";
                m_financeResponsitory.insertFinance(fi);
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }

            return data;
        }

        [HttpPost("updateFinance")]
        public DataRespond updateFinance(Finance finance)
        {
            DataRespond data = new DataRespond();
            try
            {
                Finance fi = m_financeResponsitory.getFinanceById(finance.financeid);
                fi.status = finance.status;
                fi.name = finance.name;
                fi.moneys = finance.moneys;
                fi.person = finance.person;
                m_financeResponsitory.updateFinance(fi);
                data.success = true;
                data.message = "update success";
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }

            return data;
        }
        [HttpGet("deleteFinance")]
        public DataRespond deleteFinance(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                m_financeResponsitory.deleteFinance(id);
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

        [HttpGet("revanue")]
        public DataRespond revanue(int year,int cbid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_financeResponsitory.revanue(year,cbid);
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

        [HttpGet("getTotalMoney")]
        public DataRespond getTotalMoney(int cbid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_financeResponsitory.getTotalMoney(cbid);
                data.message = "success";
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.success = false;
                data.error = e;
            }
            return data;
        }
    }
}