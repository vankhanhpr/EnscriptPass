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
    public class AdToabroadResponsitory:Responsitory<Toabroad>, IAdToabroadResponsitory
    {
        private DbSet<Toabroad> toabroadsEntity;
        public AdToabroadResponsitory(MyDBContext context) : base(context)
        {
            toabroadsEntity = context.Set<Toabroad>();
        }

        public void deleteToabroad(int id)
        {
            Toabroad toabroad = findToabroadById(id);
            if (toabroad != null)
            {
                toabroadsEntity.Remove(toabroad);
                context.SaveChanges();
            }
        }

        public dynamic filterAbroadByBox(AbroadFilter abroadFilter)
        {
            var data = from user in context.Users
                       
                       join file in context.Files
                       on user.usid equals file.usid
                       join abroad in context.Toabroad
                       on file.fileid equals abroad.fileid
                       where file.cbid == abroadFilter.cbid
                       select new
                       {
                           user.madv,
                           file.hotendangdung,
                           file.avatar,
                           file.ngayvaodangct,
                           abroad.thoigiandi,
                           abroad.thoigiantrove,
                           abroad.lydo,
                           abroad.brid,
                           abroad.noiden
                       };
            if (abroadFilter.filter == null)
            {
                abroadFilter.filter = "";
            }
            var filterby = abroadFilter.filter.Trim().ToLowerInvariant();
            return data.AsQueryable()
                                .Where(n =>
                                           n.madv.ToLowerInvariant().Contains(filterby)
                                        || n.hotendangdung.ToLowerInvariant().Contains(filterby)
                                        || n.noiden.ToLowerInvariant().Contains(filterby));
        }

        public Toabroad findToabroadById(int id)
        {
            return context.Toabroad.Where(m => m.brid == id).FirstOrDefault();
        }

        public IEnumerable<Toabroad> getToabroadByFileId(int fileid)
        {
            return context.Toabroad.Where(m => m.fileid == fileid).ToList();
        }

        public dynamic getUseByCbid(AbroadFilter filter)
        {
            DateTime startday = DateTime.ParseExact(filter.startday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            DateTime endday = DateTime.ParseExact(filter.endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);

            var data = from user in context.Users
                       join file in context.Files
                       on user.usid equals file.usid
                       join abroad in context.Toabroad
                       on file.fileid equals abroad.fileid
                       where abroad.thoigiandi >= startday
                               && abroad.thoigiandi <= endday
                       select new
                       {
                           user.madv,
                           file.hotendangdung,
                           file.avatar,
                           file.ngayvaodangct,
                           abroad.thoigiandi,
                           abroad.thoigiantrove,
                           abroad.lydo,
                           abroad.brid,
                           abroad.noiden,
                           abroad.accept
                       };
            return data;
        }

        public void insertToabroad(Toabroad toabroad)
        {
            context.Entry(toabroad).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateToabroad(Toabroad toabroad)
        {
            context.Update(toabroad);
            context.SaveChanges();
        }
    }
}
