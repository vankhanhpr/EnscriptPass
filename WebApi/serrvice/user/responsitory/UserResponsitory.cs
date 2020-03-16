using AdhererClassLib.area.request;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.authentication.interfaces;
using WebApi.serrvice.user.interfaces;

namespace WebApi.serrvice.user.responsitory
{
    public class UserResponsitory: Responsitory<Users>, IUserResponsitory
    {
        private DbSet<Users> userEntiry;
        private IHashPass m_hashPass;
        public UserResponsitory(MyDBContext context,IHashPass hashPass) : base(context)
        {
            userEntiry = context.Set<Users>();
            m_hashPass = hashPass;
        }

        public Boolean changePass(PassChange auth)
        {
            var user = GetById(auth.usid);

            if (m_hashPass.checkPass(user.password, auth.currentpass))
            {
                user.password = m_hashPass.hashPass(auth.newpass);
                Update(user);
                return true;
            }
            return false;
        }
        public Users getUserByMaDv(string madv)
        {
            //return context.Users.Where(m => m.madv == madv).Select(user => new {
            //    user,
            //    file = context.Files.Where(m => m.usid == user.usid).FirstOrDefault()
            //});
            return context.Users.Where(m => m.madv == madv).FirstOrDefault();
        }
    }
}
