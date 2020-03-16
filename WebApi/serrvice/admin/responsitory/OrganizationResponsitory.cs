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
    public class OrganizationResponsitory:Responsitory<Organization>, IOrganizationResponsitory
    {
        private DbSet<Organization> organizationsEntity;
        public OrganizationResponsitory(MyDBContext context) : base(context)
        {
            organizationsEntity = context.Set<Organization>();
        }

        public void deleteOrganization(int id)
        {
            Organization organization = findOrganizationById(id);
            if (organization != null)
            {
                context.Remove(organization);
                context.SaveChanges();
            }
        }

        public Organization findOrganizationById(int id)
        {
            return context.Organization.Where(m => m.ogid == id).FirstOrDefault();
        }

        public IEnumerable<Organization> getAllOrganization()
        {
            return context.Organization.ToList();
        }

        public void insertOrganization(Organization organization)
        {
            context.Entry(organization).State = EntityState.Added;
            context.SaveChanges();
        }

        public dynamic searchOrganization(string filter)
        {
            if (filter == null)
            {
                filter = "";
            }
            var filterby = filter.Trim().ToLowerInvariant();
            var org = context.Organization
                                .ToList()
                                .AsQueryable()
                                .Where(n =>
                                           n.ogid.ToString().ToLowerInvariant().Contains(filterby)
                                        || n.nameog.ToLowerInvariant().Contains(filterby)
            );
            return org;
        }

        public void updateOrganization(Organization organization)
        {
            context.Update(organization);
            context.SaveChanges();
        }
    }
}
