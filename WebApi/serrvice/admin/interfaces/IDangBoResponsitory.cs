using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IDangBoResponsitory:IResponsitory<DangBo>
    {
        dynamic getAllDangBo();
        void insertDangBo(DangBo  db);
        void updateDangBo(DangBo db);
        DangBo getDangBoById(int id);

        dynamic getDangBoNotAttached(int id);

        dynamic searchDangBo(string key);
    }
}
