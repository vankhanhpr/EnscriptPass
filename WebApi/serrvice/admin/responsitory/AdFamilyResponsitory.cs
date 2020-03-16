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
    public class AdFamilyResponsitory:Responsitory<Family>,IAdFamilyResponsitory
    {
        private DbSet<Family> familyEntity;
        public AdFamilyResponsitory(MyDBContext context) : base(context)
        {
            familyEntity = context.Set<Family>();
        }

        public void deleteFamily(int id)
        {
            Family fml = findFamilyById(id);
            if (fml != null)
            {
                familyEntity.Remove(fml);
                context.SaveChanges();
            }
        }

        public Family findFamilyById(int id)
        {
            return context.Family.Where(m => m.fmlid == id).FirstOrDefault();
        }

        public IEnumerable<Family> getAllFamily(int fileid)
        {
            return context.Family.Where(m => m.fileid == fileid).ToList();
        }

        public void insertFamily(Family family)
        {
            context.Entry(family).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateFamily(Family family)
        {
            context.Update(family);
            context.SaveChanges();
        }
    }
}
