using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.authentication.interfaces
{
    public interface IHashPass
    {
        string hashPass(string pass);
        Boolean checkPass(string hashedPassword, string providedPassword);
    }
}
