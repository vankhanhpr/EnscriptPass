using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface ITitleResponsitory :IResponsitory<Title>
    {
        IEnumerable<Title> getAllTitle();
    }
}
