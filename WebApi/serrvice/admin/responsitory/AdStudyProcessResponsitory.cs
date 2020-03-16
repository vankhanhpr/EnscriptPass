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
    public class AdStudyProcessResponsitory : Responsitory<StudyProcess>, IAdStudyProcessResponsitory
    {
        public AdStudyProcessResponsitory(MyDBContext context) : base(context)
        {

        }

        public void deleteStudyProcess(int studyid)
        {
            StudyProcess studyProcess = findById(studyid);
            context.Remove(studyProcess);
            context.SaveChanges();
        }

        public StudyProcess findById(int id)
        {
            return context.StudyProcess.Where(m=>m.studyid==id).FirstOrDefault();
        }

        public dynamic getStudyProcessByFile(int fileid)
        {
            var study = from file in context.Files
                        where file.fileid == fileid
                        join studyprocess in context.StudyProcess
                        on file.fileid equals studyprocess.fileid
                        select new
                        {
                            file,
                            studyprocess
                        };
            return study;
        }

        public void insertStudyProcess(StudyProcess studyProcess)
        {
            context.Entry(studyProcess).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateStudyProcess(StudyProcess studyProcess)
        {
            context.Update(studyProcess);
            context.SaveChanges();
        }
    }
}
