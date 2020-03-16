using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IAdFamilyResponsitory
    {
        IEnumerable<Family> getAllFamily(int fileid);
        void insertFamily(Family family);
        void updateFamily(Family family);
        void deleteFamily(int id);
        Family findFamilyById(int id);
    }
}
