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
    public class DangBoResponsitory : Responsitory<DangBo>, IDangBoResponsitory
    {
        private DbSet<DangBo> dangBoEntiry;
        public DangBoResponsitory(MyDBContext context) : base(context)
        {
            dangBoEntiry = context.Set<DangBo>();
        }
        public dynamic getAllDangBo()
        {
            var dangbo = context.Dangbo.Select(db => new
            {
                db,
                chibo = context.Chibo.Where(m => m.dbid == db.dbid).ToList()
            }).ToList();
            return dangbo;
        }

        public DangBo getDangBoById(int id)
        {
            return context.Dangbo.Where(m => m.dbid == id).FirstOrDefault();
        }

        public dynamic getDangBoNotAttached(int id)
        {
            var db = getDangBoById(id);
            return context.Dangbo.Where(m => m.tructhuoc == 0 && m.dbid !=db.dbid).ToList();
        }

        public void insertDangBo(DangBo db)
        {
            context.Entry(db).State = EntityState.Added;
            context.SaveChanges();
        }

        public dynamic searchDangBo(string filter)
        {
            if (filter == null)
            {
                filter = "";
            }
            var filterby = filter.Trim().ToLowerInvariant();
            var dangbo = context.Dangbo.Select(db=>new {
                                        db,
                                        chibo = context.Chibo.Where(m=>m.dbid== db.dbid)
                                    })
                                  .ToList()
                                  .AsQueryable()
                                  .Where(n =>
                                             n.db.dbid.ToString().ToLowerInvariant().Contains(filterby)
                                          || n.db.tendb.ToLowerInvariant().Contains(filterby)
            );
            return dangbo;
        }

        public void updateDangBo(DangBo db)
        {
            context.Update(db);
            context.SaveChanges();
        }
    }
}
