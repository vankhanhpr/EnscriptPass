using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.user.interfaces
{
    public interface IDisciplineResponsitory:IResponsitory<Discipline>
    {
        IEnumerable<Discipline> getAllDiscipline(int fileid);
        void insertDiscipline(Discipline discipline);
        Discipline findDisciplineById(int id);
        void updateDisciplines(Discipline discipline);
    }
}
