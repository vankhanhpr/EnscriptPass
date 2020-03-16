using AdhererClassLib.area.request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;
using WebApi.serrvice.admin.model;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IAdBonusResponsitory: IResponsitory<Bonus>
    {
        IEnumerable<Bonus> getAllBonus(int fileid);
        void insertBonus(Bonus bonus);
        void updateBonus(Bonus bonus);
        void deleteBonus(int id);
        Bonus getBonusById(int id);

        dynamic getBonusByCbid(BonusFilter bonusFilter);

        dynamic filterBonusByBox(BonusFilter bonusFilter);

    }
}
