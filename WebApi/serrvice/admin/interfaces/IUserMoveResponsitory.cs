using AdhererClassLib.area.main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IUserMoveResponsitory : IResponsitory<UserMove>
    {
        void insertUserMove(UserMove userMove);
        void updateUserMove(UserMove userMove);

        dynamic getUserByChiBo(int id);
        dynamic filterUserByBox(string filter,int cbid);
        
    }
}
