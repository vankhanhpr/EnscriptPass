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
    public class NationResponsitory : Responsitory<Nation>, INationResponsitory
    {
        private DbSet<Nation> nationEntity;
        public NationResponsitory(MyDBContext context) : base(context)
        {
            nationEntity = context.Set<Nation>();
        }
        public IEnumerable<Nation> getNations()
        {
            return context.Nation.ToList();
        }
    }
}
