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
    public class TitleResponsitory:Responsitory<Title>, ITitleResponsitory
    {
        private DbSet<Title> titelEntity;
        public TitleResponsitory(MyDBContext context) : base(context)
        {
            titelEntity = context.Set<Title>();
        }

        public IEnumerable<Title> getAllTitle()
        {
            return context.Title.ToList();
        }
    }
}
