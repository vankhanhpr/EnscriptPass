using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.responsitory
{
    public class ProvinceResponsitory: Responsitory<Province>,IProvinceResponsitory
    {
        private DbSet<Province> provinceEntity;
        public ProvinceResponsitory(MyDBContext context) : base(context)
        {
            provinceEntity = context.Set<Province>();
        }

        public IEnumerable<Province> getProvince()
        {
            return context.devvn_tinhthanhpho.ToList();
        }
    }
}
