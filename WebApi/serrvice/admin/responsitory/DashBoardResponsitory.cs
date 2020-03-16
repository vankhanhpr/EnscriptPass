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
    public class DashBoardResponsitory : Responsitory<DangBo>, IDashBoardResponsitory
    {
        private DbSet<DangBo> dangBoEntity;
        public DashBoardResponsitory(MyDBContext contex) : base(contex)
        {
            dangBoEntity = contex.Set<DangBo>();
        }

        public dynamic coundDangVienByMounth(int year)
        {
            var group = (from dav in context.Users
                         where (dav.ngaydenchibo.Year == year)
                         group dav by new { month = dav.ngaydenchibo.Month, year = dav.ngaydenchibo.Year } into d
                         select new
                         {
                             time = d.Key,
                             total = d.Count()
                         }).OrderBy(x => x.time.month);
            return group;
        }
        public dynamic getDashBoard()
        {
            var dashboard = new
            {
                dangbo = context.Dangbo.Count(),
                daydangbo = context.Dangbo.OrderByDescending(m => m.createday).FirstOrDefault().createday,
                chibo = context.Chibo.Count(),
                daychibo = context.Chibo.OrderByDescending(m => m.createday).FirstOrDefault().createday,
                dangvien = context.Users.Count(),
                daydangvien = context.Users.OrderByDescending(m => m.createday).FirstOrDefault().createday,
                donvi = context.Organization.Count(),
                daydonvi = context.Organization.OrderByDescending(m => m.createday).FirstOrDefault().createday,
                bieumau = context.Forms.Count(),
                dayform = context.Forms.OrderByDescending(m => m.updateday).FirstOrDefault().updateday,

            };
            return dashboard;
        }

        public dynamic getRevanue(int id)
        {
            //var revanue = new
            //{
            //    all = context.Users.Where(n => n.cbid == id && n.active== true).Count(),
            //    chinhthuc = (from us in context.Users.Where(m => m.cbid == id && m.ngaydenchibo.Year == DateTime.Now.Year)
            //                 join file in context.Files on us.usid equals file.usid
            //                 where (file.ngayvaodangct <= DateTime.Now)
            //                 select us
            //                 ).Count(),
            //    dubi = (from us in context.Users.Where(m => m.cbid == id && m.ngaydenchibo.Year == DateTime.Now.Year)
            //            join file in context.Files on us.usid equals file.usid
            //            where (file.ngayvaodangct > DateTime.Now)
            //            select us
            //                 ).Count(),
            //    ketnap = context.Users.Where(m => m.cbid == id && m.lydoden == 0 && m.ngaydenchibo.Year == DateTime.Now.Year).Count(),
            //    chuyenden = context.Users.Where(m => m.cbid == id && m.lydoden == 1 && m.ngaydenchibo.Year == DateTime.Now.Year).Count(),
            //    chuyendi = context.Users.Where(m => (m.cbid == id && m.lydodi == 0 && m.ngaydenchibo.Year == DateTime.Now.Year) || m.cbidold == id).Count(),
            //    tutran = context.Users.Where(m => m.cbid == id && m.lydodi == 1 && m.ngaydenchibo.Year == DateTime.Now.Year).Count(),
            //    khaitru = context.Users.Where(m => m.cbid == id && m.lydodi == 2 && m.ngaydenchibo.Year == DateTime.Now.Year).Count(),
            //    xoaten = context.Users.Where(m => m.cbid == id && m.lydodi == 3 && m.ngaydenchibo.Year == DateTime.Now.Year).Count(),
            //    rakhoidang = context.Users.Where(m => m.cbid == id && m.lydodi == 4 && m.ngaydenchibo.Year == DateTime.Now.Year).Count(),
            //    dinuocngoai = (from abroad in context.Toabroad
            //                   join file in context.Files on abroad.fileid equals file.fileid
            //                   join user in context.Users on file.usid equals user.usid
            //                   where (user.cbid == id)
            //                   select abroad
            //                   ).GroupBy(m => m.fileid).Count(),
            //    namechibo = context.Chibo.Where(m => m.cbid == id).FirstOrDefault().tencb
            //};

            return null;
        }
    }
}
