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
    public class FormResponsitory: Responsitory<Forms>, IFormsResponsitory
    {
        private DbSet<Forms> formBoEntiry;
        public FormResponsitory(MyDBContext context) : base(context)
        {
            formBoEntiry = context.Set<Forms>();
        }

        public IEnumerable<Forms> getAllForm(int type, int cbid)
        {
            return context.Forms.Where(m => m.type == type && m.cbid == cbid).ToList();
        }
    }
}
