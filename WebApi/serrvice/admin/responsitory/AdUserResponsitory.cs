using AdhererClassLib.area.request;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.model;
using WebApi.responsitory;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.authentication.interfaces;

namespace WebApi.serrvice.admin.responsitory
{

    public class AdUserResponsitory : Responsitory<Users>, IAdUserResponsitory
    {
        private DbSet<Users> userEntity;
        private IHashPass m_hashPass;
        public AdUserResponsitory(MyDBContext context,IHashPass hashPass) : base(context)
        {
            userEntity = context.Set<Users>();
            m_hashPass = hashPass;
        }

        public void blockUser(int id)
        {
            Users users = getUserById(id);
            users.active = false;
            context.Update(users);
            context.SaveChanges();
        }

        public dynamic getAllUser(int page, int pagesize)
        {
            var dangvien = context.Users.Select(user => new
            {
                user,
                file = context.Files.Where(m => m.usid == user.usid).FirstOrDefault()
                //file = from file1 in context.Files
                //       join nation in context.Nation on file1.dantoc equals nation.nationid
                //       select new
                //       {
                //           file1,
                //           nation
                //       }
            }).Where(n => n.user.active == true).Skip(page * pagesize).Take(pagesize).ToList();
            return dangvien;
        }

        //xet huy hieu dang
        public dynamic getArmorial(int id)
        {
            var armorial = (from file in context.Files
                           join user in context.Users on file.usid equals user.usid
                           where user.usid == id && file.ngayvaodangct <= DateTime.Now
                           && user.active== true
                           select new
                           {
                               name = file.hotendangdung,
                               madv= user.madv,
                               fileid = file.fileid,
                               ngayvaodang= file.ngayvaodangct,
                               year = DateTime.Now.Year - file.ngayvaodangct.Year
                           }).FirstOrDefault();
            return armorial;
        }
        public dynamic getUserByActive(int active)
        {
            switch (active)
            {
                case 2:
                    {
                        var dangvien = context.Users.Select(user => new
                        {
                            user,
                            file = context.Files.Where(m => m.usid == user.usid).FirstOrDefault()
                        }).ToList();
                        return dangvien;
                    }

                case 1:
                    {
                        var dangvien = context.Users.Select(user => new
                        {
                            user,
                            file = context.Files.Where(m => m.usid == user.usid).FirstOrDefault()
                        }).Where(n => n.user.active == false).ToList();
                        return dangvien;
                    }

                case 0:
                    {
                        var dangvien = context.Users.Select(user => new
                        {
                            user,
                            file = context.Files.Where(m => m.usid == user.usid).FirstOrDefault()
                        }).Where(n => n.user.active == true).ToList();
                        return dangvien;
                    }
            }
            return null;
        }

        public dynamic getUserByBox(string filter)
        {
            var filterby = filter.Trim().ToLowerInvariant();
            var dangvien = context.Users.Select(user => new
            {
                user,
                file = context.Files.Where(m => m.usid == user.usid).FirstOrDefault()
            }).ToList().AsQueryable().Where(n =>
                  n.user.usid.ToString().ToLowerInvariant().Contains(filterby)
                || n.user.madv.ToLowerInvariant().Contains(filterby)
            //||n.file.hotendangdung.ToLowerInvariant().Contains(filterby)
            );
            return dangvien;
        }

        public dynamic getUserByChiBo(int id, DateTime fromday, DateTime endday)
        {
            var data = context
                .Users
                .Where(m =>m.ngaydenchibo >= fromday && m.ngaydenchibo <= endday)
                .Select(user => new {
                    user,
                    file = context.Files.Where(m=>m.usid== user.usid && m.cbid==id).FirstOrDefault()
                });

            return data;
        }

        public dynamic getUserByChiBoId(int id)
        {
            var dangvien = context.Users.Select(user => new
            {
                user,
                file = context.Files.Where(m => m.usid == user.usid && m.cbid==id).FirstOrDefault()
            }).ToList();
            return dangvien;
        }

        public Users getUserById(int id)
        {
            return context.Users.Where(m => m.usid == id).FirstOrDefault();
        }

        public Users getUserByMaDv(string madv)
        {
            return context.Users.Where(m => m.madv == madv).FirstOrDefault();
        }

        public dynamic getUserByRole(int role)
        {
            if (role == 0)
            {
                var dangvien = context.Users.Select(user => new
                {
                    user,
                    file = context.Files.Where(m => m.usid == user.usid).FirstOrDefault()
                }).ToList();
                return dangvien;
            }
            else
            {
                var dangvien = context.Users.Select(user => new
                {
                    user,
                    file = context.Files.Where(m => m.usid == user.usid).FirstOrDefault()
                }).Where(n => n.user.roleid == role).ToList();
                return dangvien;
            }
        }

        public void insertUser(Users user)
        {
            user.password = m_hashPass.hashPass(user.password);
            context.Entry(user).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateUser(Users user)
        {
            user.password = m_hashPass.hashPass(user.password);
            context.Update(user);
            context.SaveChanges();
        }

        public dynamic getUserMoved(FilterUser filterUser)
        {
            try
            {
                DateTime startday = DateTime.ParseExact(filterUser.startday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                DateTime endday = DateTime.ParseExact(filterUser.endday, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                if (filterUser.type == 0)//chuyen di
                {
                    var data = from user in context.Users.Where(m=>m.active== false)
                               join usermove in context.UserMove
                               on user.usid equals usermove.usid
                               where usermove.createday >= startday
                               && usermove.createday <= endday
                               join file in context.Files
                               on user.usid equals file.usid
                               where file.cbid == filterUser.cbid
                               select new
                               {
                                   user,
                                   file,
                                   usermove
                               };
                    return data;
                }
                else
                {
                    var data = from user in context.Users

                               join file in context.Files
                               on user.usid equals file.usid
                               where user.ngaydenchibo >= startday && user.ngaydenchibo <= endday && file.cbid == filterUser.cbid
                               select new
                               {
                                   user,
                                   file
                               };
                    return data;
                }
            }
            catch(Exception e)
            {
                return e;
            }
        }
    }
}
