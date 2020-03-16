using AdhererClassLib.area.main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IAdStudyProcessResponsitory
    {
        dynamic getStudyProcessByFile(int fileid);

        void insertStudyProcess(StudyProcess studyProcess);
        void updateStudyProcess(StudyProcess studyProcess);
        void deleteStudyProcess(int studyid);
        StudyProcess findById(int id);
    }
}
