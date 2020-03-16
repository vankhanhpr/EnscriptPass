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
    public class AdDisciplineResponsitory:Responsitory<Discipline>, IAdDisciplineResponsitory
    {
        private DbSet<Discipline> disciplinesEntity;
        public AdDisciplineResponsitory(MyDBContext context) : base(context)
        {
            disciplinesEntity = context.Set<Discipline>();
        }

        public void deleteDiscipline(int id)
        {
            Discipline discipline = findDisciplineById(id);
            if (discipline != null)
            {
                disciplinesEntity.Remove(discipline);
                context.SaveChanges();
            }
        }

        public dynamic filteDisByBox(DisFilter disFilter)
        {
            var data = from user in context.Users
                      
                       join file in context.Files
                       on user.usid equals file.usid
                       join dis in context.Discipline
                       on file.fileid equals dis.fileid
                       where file.cbid == disFilter.cbid
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
            if (disFilter.filter == null)
            {
                disFilter.filter = "";
            }
            var filterby = disFilter.filter.Trim().ToLowerInvariant();
            return data.AsQueryable()
                                .Where(n =>
                                           n.madv.ToLowerInvariant().Contains(filterby)
                                        || n.hotendangdung.ToLowerInvariant().Contains(filterby)
                                        || n.noidung.ToLowerInvariant().Contains(filterby));
        }

        public Discipline findDisciplineById(int id)
        {
            return context.Discipline.Where(m => m.dsid == id).FirstOrDefault();
        }

        public IEnumerable<Discipline> getAllDiscipline(int fileid)
        {
            return context.Discipline.Where(m => m.fileid == fileid).ToList();
        }

        public dynamic getDisByCbId(DisFilter  disFilter)
        {
            DateTime startday = DateTime.ParseExact(disFilter.startday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            DateTime endday = DateTime.ParseExact(disFilter.endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);

            var data = from user in context.Users
                       
                       join file in context.Files
                       on user.usid equals file.usid
                       join dis in context.Discipline
                       on file.fileid equals dis.fileid
                       where dis.daycreate>= startday  && file.cbid== disFilter.cbid
                       && dis.daycreate <= endday
                       select new
                       {
                           user.madv,
                           file.hotendangdung,
                           file.avatar,
                           file.ngayvaodangct,
                           dis.daycreate,
                           dis.noidung,
                           dis.dsid,
                           dis.accept,
                           user.usid
                       };

            return data;
        }

        public dynamic getUserByCbid(int id)
        {
            var data = from user in context.Users
                       where user.active == true
                       join file in context.Files
                       on user.usid equals file.usid
                       where file.cbid == id
                       select new
                       {
                           user.madv,
                           file.fileid,
                           file.hotendangdung,
                           user.usid
                       };
            return data;
        }

        public void insertDiscipline(Discipline discipline)
        {
            context.Entry(discipline).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateDisciplines(Discipline discipline)
        {
            context.Update(discipline);
            context.SaveChanges();
        }
    }
}
