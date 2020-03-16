using AdhererClassLib.area.main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IAdWorkingProcessResponsitory
    {
        dynamic getWorkingProcessByFile(int fileid);
        void insertWorkingProcess(WorkingProcess workingProcess);
        void updateWorkingProcess(WorkingProcess workingProcess);
        void deleteWorkingProces(int workid);
        WorkingProcess findWorkingProcessById(int workid);
    }
}
