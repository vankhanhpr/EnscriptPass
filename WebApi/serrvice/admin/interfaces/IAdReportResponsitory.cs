using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IAdReportResponsitory:IResponsitory<Report>
    {
        IEnumerable<Report> getAllReport(int page, int pagesize);
        void insertResport(Report report);
        void updateReport(Report report);
        void deleteReport(int id);
        Report findReportById(int id);
    }
}
