using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.user.interfaces
{
    public interface IFormsResponsitory: IResponsitory<Forms>
    {
        IEnumerable<Forms> getAllForm(int type, int cbid);
    }
}
