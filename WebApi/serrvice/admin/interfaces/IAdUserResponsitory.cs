using AdhererClassLib.area.request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.model;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IAdUserResponsitory:IResponsitory<Users>
    {
        dynamic getAllUser(int page,int pagesize);
        void insertUser(Users user);
        void updateUser(Users user);
        Users getUserByMaDv(string madv);

        Users getUserById(int id);

        void blockUser(int id);

        dynamic getUserByRole(int role);

        dynamic getUserByActive(int active);
        dynamic getUserByBox(string filter);

        dynamic getUserByChiBo(int id,DateTime fromday,DateTime endday);
        dynamic getUserByChiBoId(int id);

        dynamic getArmorial(int id);
        dynamic getUserMoved(FilterUser filterUser);
    }
}
