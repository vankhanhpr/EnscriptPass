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
    public class BonusResponsitory: Responsitory<Bonus>, IBonusResponsitory
    {
        private DbSet<Bonus> bonusEntinty;
        private int id;

        public BonusResponsitory(MyDBContext context) : base(context)
        {
            bonusEntinty = context.Set<Bonus>();
        }

        public IEnumerable<Bonus> getAllBonus(int fileid)
        {
            return context.Bonus.Where(m => m.fileid == fileid).ToList();
        }

        public void deleteBonus(int id)
        {
            bonusEntinty.Remove(findBonusById(id));
            context.SaveChanges();
        }
        public Bonus findBonusById(int id)
        {
            return context.Bonus.Where(m => m.bnid == id).FirstOrDefault();
        }

        public void insertBonus(Bonus bonus)
        {
            context.Entry(bonus).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateBonus(Bonus bonus)
        {
            context.Update(bonus);
            context.SaveChanges();
        }
    }
}
