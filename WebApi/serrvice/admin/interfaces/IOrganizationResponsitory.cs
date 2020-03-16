using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IOrganizationResponsitory:IResponsitory<Organization>
    {
        IEnumerable<Organization> getAllOrganization();
        void insertOrganization(Organization organization);
        void updateOrganization(Organization organization);
        void deleteOrganization(int id);
        Organization findOrganizationById(int id);
        dynamic searchOrganization(string filter);
    }
}
