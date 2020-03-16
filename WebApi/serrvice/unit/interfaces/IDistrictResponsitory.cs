using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.unit.interfaces
{
    public interface IDistrictResponsitory:IResponsitory<District>
    {
        IEnumerable<District> getDistrictByPrId(string id);
    }
}
