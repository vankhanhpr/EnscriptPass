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
    public class AdFormResponsitory:Responsitory<Forms>,IAdFormResponsitory
    {

        private DbSet<Forms> formEntity;
        public AdFormResponsitory(MyDBContext context) : base(context)
        {
            formEntity = context.Set<Forms>();
        }

        public void deleteForm(int id)
        {
            Forms form = findFormById(id);
            if (form!=null)
            {
                formEntity.Remove(form);
                context.SaveChanges();
            }
        }

        public Forms findFormById(int id)
        {
            return context.Forms.Where(m => m.formid == id).FirstOrDefault();
        }

        public IEnumerable<Forms> getAllForm(int type,int cbid)
        {
            return context.Forms.Where(m=>m.type== type && m.cbid==cbid).ToList();
        }

        public void insertForm(Forms form)
        {
            context.Entry(form).State = EntityState.Added;
            context.SaveChanges();
        }

        public dynamic searchForms(int type, int cbid, string filter)
        {
            if (filter == null)
            {
                filter = "";
            }
            var filterby = filter.Trim().ToLowerInvariant();
            var form = context.Forms
                                .Where(m => m.type == type && m.cbid==cbid)
                                .ToList()
                                .AsQueryable()
                                .Where(n =>
                                           n.formid.ToString().ToLowerInvariant().Contains(filterby)
                                        || n.nameform.ToLowerInvariant().Contains(filterby)
                                        || n.namefile.ToLowerInvariant().Contains(filterby)
            );
            return form;
        }

        public void updateForm(Forms form)
        {
            context.Update(form);
            context.SaveChanges();
        }
    }
}
