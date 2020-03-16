using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IDashBoardResponsitory:IResponsitory<DangBo>
    {
        dynamic getDashBoard();

        dynamic coundDangVienByMounth(int year);

        dynamic getRevanue(int id);
    }
}
