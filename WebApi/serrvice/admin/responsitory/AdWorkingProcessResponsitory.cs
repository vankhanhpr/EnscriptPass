using AdhererClassLib.area.main;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.interfaces;

namespace WebApi.serrvice.admin.responsitory
{
    public class AdWorkingProcessResponsitory : Responsitory<WorkingProcess>, IAdWorkingProcessResponsitory
    {
        public AdWorkingProcessResponsitory(MyDBContext context) : base(context)
        {
        }

        public void deleteWorkingProces(int workid)
        {
            WorkingProcess workingProcess = findWorkingProcessById(workid);
            context.Remove(workingProcess);
            context.SaveChanges();
        }

        public WorkingProcess findWorkingProcessById(int workid)
        {
            return context.WorkingProcess.Where(m => m.workingid == workid).FirstOrDefault();
        }

        public dynamic getWorkingProcessByFile(int fileid)
        {
            var work = from file in context.Files
                       where file.fileid == fileid
                       join process in context.WorkingProcess
                       on file.fileid equals process.fileid
                       select new
                       {
                           file,
                           process
                       };
            return work;
        }

        public void insertWorkingProcess(WorkingProcess workingProcess)
        {
            context.Entry(workingProcess).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateWorkingProcess(WorkingProcess workingProcess)
        {
            context.Update(workingProcess);
            context.SaveChanges();
        }
    }
}
