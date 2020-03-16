
using System.Collections.Generic;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.user.interfaces
{
    public interface IBonusResponsitory: IResponsitory<Bonus>
    {
        IEnumerable<Bonus> getAllBonus(int fileid);
        void insertBonus(Bonus bn);
        Bonus findBonusById(int id);
        void updateBonus(Bonus bn);
        void deleteBonus(int id);
    }
}
