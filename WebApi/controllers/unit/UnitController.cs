using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.unit.interfaces;

namespace WebApi.controllers.unit
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitController : Controller
    {
        private IProvinceResponsitory m_provinceResponsitory;
        private IDistrictResponsitory m_districtResponsitory;
        private IWardResponsitory m_wardResponsitory;
        public UnitController(IProvinceResponsitory provinceResponsitory,IDistrictResponsitory districtResponsitory,IWardResponsitory wardResponsitory)
        {
            m_provinceResponsitory = provinceResponsitory;
            m_districtResponsitory = districtResponsitory;
            m_wardResponsitory = wardResponsitory;
        }
        [HttpGet("getProvince")]
        public DataRespond getProvince()
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_provinceResponsitory.getProvince();
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpGet("getDistrictByPrId")]
        public DataRespond getDistrictByPrId(string id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_districtResponsitory.getDistrictByPrId(id);
                data.message = "Get districts success!";
            }
            catch(Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }
        [HttpGet("getWardByDsId")]
        public DataRespond getWardByDsId(string id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_wardResponsitory.getWardByDsId(id);
                data.message = "Get wards success!";
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