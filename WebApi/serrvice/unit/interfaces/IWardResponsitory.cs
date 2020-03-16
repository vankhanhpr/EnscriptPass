using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.unit.interfaces
{
    public interface IWardResponsitory:IResponsitory<Ward>
    {
        IEnumerable<Ward> getWardByDsId(string id);
    }
}
