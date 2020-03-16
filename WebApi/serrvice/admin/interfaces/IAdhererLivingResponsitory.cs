using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IAdhererLivingResponsitory:IResponsitory<AdhererLiving>
    {
        dynamic getAllAdhererLiving(int cbid);
        AdhererLiving getAdhererLivingById(int id);
        void insertAdhererLiving(AdhererLiving adhererLiving);
        void updateAdhererLiving(AdhererLiving adhererLiving);
        void deleteAdhererLiving(AdhererLiving adhererLiving);
    }
}
