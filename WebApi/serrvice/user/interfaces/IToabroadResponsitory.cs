using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.user.interfaces
{
    public interface IToabroadResponsitory: IResponsitory<Toabroad>
    {
        IEnumerable<Toabroad> getAllToabroad();
        void insertToabroad(Toabroad toabroad);
        void updateToabroad(Toabroad toabroad);
        void deleteToabroad(int id);
        Toabroad findToabroadById(int id);
        dynamic getToabroadByFileId(int id);
    }
}
