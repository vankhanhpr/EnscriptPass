using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.user.interfaces;

namespace WebApi.serrvice.user.responsitory
{
    public class FamilyResponsitory:Responsitory<Family>, IFamilyResponsitory
    {
        private DbSet<Family> familyEntity;
        public FamilyResponsitory(MyDBContext context) : base(context)
        {
            familyEntity = context.Set<Family>();
        }

        public dynamic findFamilyById(int id)
        {
            return context.Family.Where(m=>m.fmlid==id).FirstOrDefault();
        }

        public dynamic getAllFamily(int fileid)
        {
            return context.Family.Where(m => m.fileid == fileid).ToList();
        }

        public IEnumerable<Family> getFamilyByUserId(int userid)
        {
            var fileid = context.Files.Where(m => m.usid == userid).FirstOrDefault().fileid;
            return context.Family.Where(m => m.fileid == fileid).ToList();
        }

        public void insertFamily(Family fml)
        {
            context.Entry(fml).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateFamily(Family fml)
        {
            context.Update(fml);
            context.SaveChanges();
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
    }
}
