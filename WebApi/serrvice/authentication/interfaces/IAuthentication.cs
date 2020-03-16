using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.model;
using WebApi.model.request;
using WebApi.serrvice.authentication.model;

namespace WebApi.serrvice.authentication
{
    public interface IAuthentication
    {
        DataRespond login(Auth auth);
        void logout(int madv);

        void refreshToken();

        Boolean validateToken(String token, string tokenClien);

        Boolean checkPass(string pass, string passClient);
        Boolean checkToken(TokenRequest tokenrq);

    }
}
