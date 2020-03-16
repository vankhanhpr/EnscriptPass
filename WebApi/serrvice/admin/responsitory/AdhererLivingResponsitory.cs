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
    public class AdhererLivingResponsitory : Responsitory<AdhererLiving>, IAdhererLivingResponsitory
    {
        private DbSet<AdhererLiving> adhererLivingEntity;
        public AdhererLivingResponsitory(MyDBContext context) : base(context)
        {
            adhererLivingEntity = context.Set<AdhererLiving>();
        }
        public void deleteAdhererLiving(AdhererLiving adhererLiving)
        {
            adhererLivingEntity.Remove(adhererLiving);
            context.SaveChanges();
        }

        public AdhererLiving getAdhererLivingById(int id)
        {
            return context.AdhererLiving.Where(m => m.livid == id).FirstOrDefault();
        }

        public dynamic getAllAdhererLiving(int cbid)
        {
            return context.AdhererLiving.Where(m=>m.cbid==cbid).ToList();
        }

        public void insertAdhererLiving(AdhererLiving adhererLiving)
        {
            context.Entry(adhererLiving).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateAdhererLiving(AdhererLiving adhererLiving)
        {
            context.Update(adhererLiving);
            context.SaveChanges();
        }
    }
}
