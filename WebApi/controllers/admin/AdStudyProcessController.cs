using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AdhererClassLib.area.main;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.serrvice.admin.interfaces;

namespace WebApi.controllers.admin
{
    //[Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdStudyProcessController : Controller
    {
        private IAdStudyProcessResponsitory m_adStudyProcessResponsitory;
        public AdStudyProcessController(IAdStudyProcessResponsitory adStudyProcessResponsitory)
        {
            m_adStudyProcessResponsitory = adStudyProcessResponsitory;
        }
        [HttpPost("insertStudyProcess")]
        public DataRespond insertStudyProcess([FromBody]StudyProcessRequest request)
        {
            DataRespond data = new DataRespond();
            try
            {
                StudyProcess studyProcess = new StudyProcess();
                if (request.studyid != -1)
                {
                    studyProcess = m_adStudyProcessResponsitory.findById(request.studyid);
                }
                else
                {
                    studyProcess.createday = DateTime.Now;
                    studyProcess.accept = false;
                    studyProcess.active = true;
                }

                DateTime starttime = DateTime.ParseExact(request.starttime, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                studyProcess.starttime = starttime;
                DateTime endtime = DateTime.ParseExact(request.endtime, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                studyProcess.endtime = endtime;
                studyProcess.process = request.process;
                studyProcess.graduationtype = request.graduationtype;
                studyProcess.degreetype = request.degreetype;
                studyProcess.fileid = request.fileid;
                studyProcess.typeofeducation = request.typeofeducation;
                studyProcess.adress = request.adress;
                
                if (request.studyid != -1)
                {
                    m_adStudyProcessResponsitory.updateStudyProcess(studyProcess);
                }
                else
                {
                    m_adStudyProcessResponsitory.insertStudyProcess(studyProcess);
                }
                data.success = true;
                data.message = "insert success";
            }
            catch (Exception e)
            {
                data.success = true;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        [HttpGet("getStudyProcessByFile")]
        public DataRespond getStudyProcess(int fileid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.data = m_adStudyProcessResponsitory.getStudyProcessByFile(fileid);
                data.success = true;
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

        [HttpGet("deleteStudyProcess")]
        public DataRespond deleteStudyProcess(int studyid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "delete success";
                m_adStudyProcessResponsitory.deleteStudyProcess(studyid);
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