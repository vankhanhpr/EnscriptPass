using AdhererClassLib.area.request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IAdToabroadResponsitory:IResponsitory<Toabroad>
    {
        IEnumerable<Toabroad> getToabroadByFileId(int fileid);
        void insertToabroad(Toabroad toabroad);
        void updateToabroad(Toabroad toabroad);
        void deleteToabroad(int id);
        Toabroad findToabroadById(int id);
        dynamic getUseByCbid(AbroadFilter filter);
        dynamic filterAbroadByBox(AbroadFilter abroadFilter);
    }
}
