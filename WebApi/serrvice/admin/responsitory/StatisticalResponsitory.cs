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
    public class StatisticalResponsitory : Responsitory<Users>, IStatisticalResponsitory
    {
        private DbSet<Users> userEntity;
        public StatisticalResponsitory(MyDBContext context) : base(context)
        {
            userEntity = context.Set<Users>();
        }

        public dynamic filterUser(FilterUser filterUser)
        {
            var startday = DateTime.ParseExact(filterUser.startday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var endday = DateTime.ParseExact(filterUser.endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var data = from user in context.Users
                       join file in context.Files
                       on user.usid equals file.usid
                       where file.cbid == filterUser.cbid
                                && user.ngaydenchibo >= startday
                                && user.ngaydenchibo <= endday
                       select new
                       {
                           user,
                           file
                       };
            if(filterUser.gender != -1)
            {
                data = data.Where(m => m.file.gioitinh == (filterUser.gender == 1 ? true : false));
            }
            if(filterUser.tongiao != "Tất cả tôn giáo")
            {
                data = data.Where(m=>m.file.tongiao == filterUser.tongiao);
            }
            if (filterUser.lyluanct != -1)
            {
                data = data.Where(m=>m.file.lyluanct== filterUser.lyluanct);
            }
            if (filterUser.bangcap != -1)
            {
                data = data.Where(m => m.file.bangcap == filterUser.bangcap);
            }
            if (filterUser.chucvu != -1)
            {
                data= data.Where(m => m.file.titleid == filterUser.chucvu);
            }
            if (filterUser.phongban != -1)
            {
                data= data.Where(m => m.file.donvi == filterUser.phongban);
            }
            if(filterUser.chuyendang != -1)
            {
                switch (filterUser.chuyendang)
                {
                    case 0:
                        break;
                    case 1:
                        
                        break;
                }
            }
            return data;
        }

        public dynamic getUserByBonus(FilterUser filterUser)
        {
            var startday = DateTime.ParseExact(filterUser.startday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var endday = DateTime.ParseExact(filterUser.endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);

            var data = from user in context.Users
                       join file in context.Files on user.usid equals file.usid
                       join bonus in context.Bonus on file.fileid equals bonus.fileid
                       where file.cbid == filterUser.cbid
                               && bonus.daycreate>= startday
                               && bonus.daycreate<= endday
                       select new
                       {
                           user.madv,
                           file.hotendangdung,
                           file.hotenkhaisinh,
                           file.ngayvaodangct,
                           file.avatar,
                           bonus.daycreate,
                           bonus.noidung
                       };
                return data;

        }

        public dynamic getUserByDesCr(FilterUser filterUser)
        {
            var startday = DateTime.ParseExact(filterUser.startday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var endday = DateTime.ParseExact(filterUser.endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var data = from user in context.Users
                       join file in context.Files
                       on user.usid equals file.usid
                       join des in context.Discipline
                       on file.fileid equals des.fileid
                       where file.cbid == filterUser.cbid
                       select new
                       {
                           user.madv,
                           file.hotendangdung,
                           file.hotenkhaisinh,
                           file.avatar,
                           des.noidung,
                           des.daycreate
                       };
                return data;
        }

        public dynamic getUserToaBroad(FilterUser filterUser)
        {
            var startday = DateTime.ParseExact(filterUser.startday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var endday = DateTime.ParseExact(filterUser.endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var data = from user in context.Users
                       
                       join file in context.Files
                       on user.usid equals file.usid
                       join abr in context.Toabroad
                       on file.fileid equals abr.fileid
                       where file.cbid == filterUser.cbid
                       select new
                       {
                           user.madv,
                           file.hotendangdung,
                           file.hotenkhaisinh,
                           file.avatar,
                           abr.lydo,
                           abr.thoigiandi
                       };
                return data;
        }
    }
}
