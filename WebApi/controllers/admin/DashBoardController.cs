using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class DashBoardController : Controller
    {
        private IDashBoardResponsitory m_dashBoardResponsitory;
        public DashBoardController(IDashBoardResponsitory dangBoResponsitory)
        {
            m_dashBoardResponsitory = dangBoResponsitory;
        }
        [HttpGet("getDashBoard")]
        public DataRespond getDashBoard()
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_dashBoardResponsitory.getDashBoard();
                data.message = "success";
            }
            catch (Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpGet("countByMount")]
        public DataRespond groupByMonth(int year)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_dashBoardResponsitory.coundDangVienByMounth(year);
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

        [HttpGet("getRevanue")]
        public DataRespond getRevanue(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_dashBoardResponsitory.getRevanue(id);
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
    }
}