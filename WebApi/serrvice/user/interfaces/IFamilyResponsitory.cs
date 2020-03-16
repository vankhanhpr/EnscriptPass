using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.user.interfaces
{
    public interface IFamilyResponsitory: IResponsitory<Family>
    {
        IEnumerable<Family> getFamilyByUserId(int userid);
        dynamic getAllFamily(int fileid);
        void insertFamily(Family fml);
        dynamic findFamilyById(int id);
        void updateFamily(Family fml);
        void deleteFamily(int id);
    }
}
