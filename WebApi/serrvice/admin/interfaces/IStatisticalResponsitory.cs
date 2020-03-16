using AdhererClassLib.area.request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IStatisticalResponsitory
    {
        dynamic filterUser(FilterUser filterUser);
        dynamic getUserByBonus(FilterUser filterUser);
        dynamic getUserByDesCr(FilterUser filterUser);
        dynamic getUserToaBroad(FilterUser filterUser);
    }
}
