using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.user.interfaces;

namespace WebApi.serrvice.user.responsitory
{
    public class ToabroadResponsitory : Responsitory<Toabroad>, IToabroadResponsitory
    {
        private DbSet<Toabroad> toabroadEntiry;
        public ToabroadResponsitory(MyDBContext context) : base(context)
        {
            toabroadEntiry = context.Set<Toabroad>();
        }

        public void deleteToabroad(int id)
        {
            Toabroad toabroad = findToabroadById(id);
            if(toabroad != null){
                toabroadEntiry.Remove(toabroad);
                context.SaveChanges();
            }

        }

        public Toabroad findToabroadById(int id)
        {
            return context.Toabroad.Where(m => m.brid == id).FirstOrDefault();
        }

        public IEnumerable<Toabroad> getAllToabroad()
        {
            return context.Toabroad.ToList();
        }

        public dynamic getToabroadByFileId(int id)
        {
            return context.Toabroad.Where(m => m.fileid == id).ToList();
        }

        public void insertToabroad(Toabroad toabroad)
        {
            context.Entry(toabroad).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateToabroad(Toabroad toabroad)
        {
            context.Update(toabroad);
            context.SaveChanges();
        }
    }
}
