using AdhererClassLib.area.request;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.responsitory
{
    public class AdBonusResponsitory: Responsitory<Bonus>, IAdBonusResponsitory
    {
        private DbSet<Bonus> bonusEntinty;
        public AdBonusResponsitory(MyDBContext context) : base(context)
        {
            bonusEntinty = context.Set<Bonus>();
        }

        public void deleteBonus(int id)
        {
            bonusEntinty.Remove(getBonusById(id));
            context.SaveChanges();
        }

        public dynamic filterBonusByBox(BonusFilter bonusFilter)
        {
            var data = from user in context.Users
                       
                       join file in context.Files
                       on user.usid equals file.usid
                       join dis in context.Bonus
                       on file.fileid equals dis.fileid
                       where file.cbid == bonusFilter.cbid
                       select new
                       {
                           user.madv,
                           file.fileid,
                           file.hotendangdung,
                           file.avatar,
                           file.ngayvaodangct,
                           dis.daycreate,
                           dis.noidung
                       };
            if (bonusFilter.filter == null)
            {
                bonusFilter.filter = "";
            }
            var filterby = bonusFilter.filter.Trim().ToLowerInvariant();
            return data.AsQueryable()
                                .Where(n =>
                                           n.madv.ToLowerInvariant().Contains(filterby)
                                        || n.hotendangdung.ToLowerInvariant().Contains(filterby)
                                        || n.noidung.ToLowerInvariant().Contains(filterby));
        }

        public IEnumerable<Bonus> getAllBonus(int fileid)
        {
            return context.Bonus.Where(m=>m.fileid==fileid).ToList();
        }

        public dynamic getBonusByCbid(BonusFilter bonusFilter)
        {
            DateTime startday = DateTime.ParseExact(bonusFilter.startday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            DateTime endday = DateTime.ParseExact(bonusFilter.endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);

            var data = from user in context.Users
                       join file in context.Files
                       on user.usid equals file.usid
                       join bonus in context.Bonus
                       on file.fileid equals bonus.fileid
                       where bonus.daycreate >= startday && bonus.daycreate<= endday
                       && file.cbid == bonusFilter.cbid
                       select new
                       {
                           user.madv,
                           file.hotendangdung,
                           file.ngaythangnamsinh,
                           file.avatar,
                           file.ngayvaodangct,
                           bonus.daycreate,
                           bonus.noidung,
                           bonus.bnid,
                           bonus.accept
                       };
            return data;
        }

        public Bonus getBonusById(int id)
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
