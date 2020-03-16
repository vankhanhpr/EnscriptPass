using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IChiBoResponsitory:IResponsitory<ChiBo>
    {
        dynamic getAllChiBo();
        dynamic getChiBoByDB(int id);
        void insertChoBo(ChiBo cb);
        void updateChiBo(ChiBo cb);
        ChiBo getChiBoById(int id);
        dynamic searchChiBo(string filter,int id);
    }
}
