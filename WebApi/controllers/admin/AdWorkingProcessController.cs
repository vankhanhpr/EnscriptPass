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
    //[Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdWorkingProcessController : Controller
    {
        private IAdWorkingProcessResponsitory m_adWorkingProcessResponsitory;
        public AdWorkingProcessController(IAdWorkingProcessResponsitory adWorkingProcessResponsitory)
        {
            m_adWorkingProcessResponsitory = adWorkingProcessResponsitory;
        }

        [HttpPost("insertWorkingProcess")]
        public DataRespond insertWorkingProcess(WorkingProcessRequest request)
        {
            DataRespond data = new DataRespond();
            try
            {

                WorkingProcess workingProcess = new WorkingProcess();
                if(request.workingid != -1)
                {
                    workingProcess = m_adWorkingProcessResponsitory.findWorkingProcessById(request.workingid);
                }
                else
                {
                    workingProcess.accept = false;
                    workingProcess.active = true;
                    workingProcess.createday = DateTime.Now;
                }
                workingProcess.address = request.address;
                workingProcess.process = request.process;
                workingProcess.title = request.title;
                workingProcess.organization = request.organization;
                DateTime starttime = DateTime.ParseExact(request.starttime, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                workingProcess.starttime = starttime;
                DateTime endtime = DateTime.ParseExact(request.endtime, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                workingProcess.endtime = endtime;
                workingProcess.fileid = request.fileid;

                if (request.workingid == -1)
                {
                    m_adWorkingProcessResponsitory.insertWorkingProcess(workingProcess);
                }
                else
                {
                    m_adWorkingProcessResponsitory.updateWorkingProcess(workingProcess);
                }

                data.success = true;
                data.message = "insert success";
            }
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        [HttpGet("getWorkingProcessByFile")]
        public DataRespond getWorkingProcesByFile(int fileid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "success";
                data.data = m_adWorkingProcessResponsitory.getWorkingProcessByFile(fileid);
            }
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        [HttpGet("deleteWorkingProcess")]
        public DataRespond deleteWorkingProcess(int workingid)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.message = "delete success";
                m_adWorkingProcessResponsitory.deleteWorkingProces(workingid);
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }
    }
}