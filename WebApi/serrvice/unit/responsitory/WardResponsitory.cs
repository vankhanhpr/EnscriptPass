using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.unit.interfaces;

namespace WebApi.serrvice.unit.responsitory
{
    public class WardResponsitory: Responsitory<Ward> , IWardResponsitory
    {
        private DbSet<Ward> wardEntity;
        public WardResponsitory(MyDBContext context) : base(context)
        {
            wardEntity = context.Set<Ward>();
        }

        public IEnumerable<Ward> getWardByDsId(string id)
        {
            return context.devvn_xaphuongthitran.Where(m => m.maqh == id).ToList();
        }
    }
}
