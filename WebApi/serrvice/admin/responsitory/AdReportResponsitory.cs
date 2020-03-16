using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.responsitory
{
    public class AdReportResponsitory:Responsitory<Report>,IAdReportResponsitory
    {
        private DbSet<Report> reportEntity;
        public AdReportResponsitory(MyDBContext context) : base(context)
        {
            reportEntity = context.Set<Report>();
        }

        public void deleteReport(int id)
        {
            Report report = findReportById(id);
            if (report != null)
            {
                reportEntity.Remove(report);
                context.SaveChanges();
            }
        }

        public Report findReportById(int id)
        {
            return context.Report.Where(m => m.rpid == id).FirstOrDefault();
        }

        public IEnumerable<Report> getAllReport(int page, int pagesize)
        {
            return context.Report.Skip(page * pagesize).Take(pagesize).ToList();
        }

        public void insertResport(Report report)
        {
            context.Entry(report).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateReport(Report report)
        {
            context.Update(report);
            context.SaveChanges();
        }
    }
}
