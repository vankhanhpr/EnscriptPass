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
    public class DisciplineController : Controller
    {
        private IDisciplineResponsitory m_DisciplineResponsitory;
        public DisciplineController(IDisciplineResponsitory DisciplineResponsitory)
        {
            m_DisciplineResponsitory = DisciplineResponsitory;
        }
        [HttpGet("getDiscipline")]
        public DataRespond getDiscipline(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_DisciplineResponsitory.getAllDiscipline(id);
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

        [HttpPost("insertDiscipline")]
        public DataRespond insertDiscipline(DisciplineRequest disrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Discipline dis = new Discipline();
                dis.fileid = disrq.fileid;
                dis.noidung = disrq.noidung;
                dis.donvi = disrq.donvi;
                DateTime timediscipline = DateTime.ParseExact(disrq.daycreate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                dis.daycreate = timediscipline;
                dis.ghichu = disrq.ghichu;
                dis.updateday = DateTime.Now;
                dis.active = true;
                dis.approved = true;

                data.success = true;
                m_DisciplineResponsitory.insertDiscipline(dis);
                data.message = "insert success";
                data.data = m_DisciplineResponsitory.findDisciplineById(dis.dsid);
            }
            catch (Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        [HttpGet("getDisciplineById")]
        public DataRespond getDisciplineById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_DisciplineResponsitory.findDisciplineById(id);
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

        [HttpPost("updateDiscipline")]
        public DataRespond updateDiscipline(DisciplineRequest disrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Discipline dis = m_DisciplineResponsitory.findDisciplineById(disrq.dsid);
                dis.fileid = disrq.fileid;
                dis.noidung = disrq.noidung;
                dis.donvi = disrq.donvi;
                DateTime timediscipline = DateTime.ParseExact(disrq.daycreate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                dis.daycreate = timediscipline;
                dis.ghichu = disrq.ghichu;
                data.success = true;
                m_DisciplineResponsitory.updateDisciplines(dis);
                data.message = "update success";
                data.data = m_DisciplineResponsitory.findDisciplineById(dis.dsid);
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }
    }
}