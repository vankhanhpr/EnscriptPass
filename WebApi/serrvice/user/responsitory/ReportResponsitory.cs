using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.user.interfaces;

namespace WebApi.serrvice.user.responsitory
{
    public class ReportResponsitory: Responsitory<Report>, IReportResponsitory
    {
        private DbSet<Report> reportEntiry;
        public ReportResponsitory(MyDBContext context) : base(context)
        {
            reportEntiry = context.Set<Report>();
        }

        public IEnumerable<Report> getAllReport()
        {
            return context.Report.ToList();
        }
    }
}
