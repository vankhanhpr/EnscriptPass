using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.serrvice.user.interfaces;

namespace WebApi.controllers.user
{
    //authen
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : Controller
    {
        private IFormsResponsitory m_formsResponsitory;
        public FormController(IFormsResponsitory formsResponsitory)
        {
            m_formsResponsitory = formsResponsitory;
        }
        [HttpGet("getAllForm")]
        public DataRespond getallForm(int type, int cbid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_formsResponsitory.getAllForm(type, cbid);
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