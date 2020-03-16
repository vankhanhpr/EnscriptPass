using AdhererClassLib.area.request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.model;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.user.interfaces
{
    public interface IUserResponsitory : IResponsitory<Users>
    {
        Users getUserByMaDv(string madv);
        Boolean changePass(PassChange auth);
    }
}
