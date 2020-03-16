using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.unit.interfaces;

namespace WebApi.serrvice.unit.responsitory
{
    public class DistrictResponsitory: Responsitory<District>, IDistrictResponsitory
    {
        private DbSet<District> districtEntity;
        public DistrictResponsitory(MyDBContext context) : base(context)
        {
            districtEntity = context.Set<District>();
        }

        public IEnumerable<District> getDistrictByPrId(string id)
        {
            return context.devvn_quanhuyen.Where(m => m.matp == id).ToList();
        }
    }
}
