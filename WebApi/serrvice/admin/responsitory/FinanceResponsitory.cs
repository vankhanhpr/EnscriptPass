using AdhererClassLib.area.main;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.interfaces.responsitory;
using WebApi.responsitory;
using WebApi.serrvice.admin.interfaces;

namespace WebApi.serrvice.admin.responsitory
{

    public class FinanceResponsitory:Responsitory<Finance>, IFinanceResponsitory
    {
        private DbSet<Finance> financeEntity;
        public FinanceResponsitory(MyDBContext context) : base(context)
        {
            financeEntity = context.Set<Finance>();
        }

        public void deleteFinance(int id)
        {
            var fi = getFinanceById(id);
            financeEntity.Remove(fi);
            context.SaveChanges();
        }

        public Finance getFinanceById(int id)
        {
            return context.Finance.Where(m => m.financeid == id).FirstOrDefault();
        }

        public dynamic getFinanceByStatus(int status,int cbid)
        {
            return context.Finance.Where(m => m.status == status && m.cbid==cbid).ToList();
        }

        public dynamic getTotalMoney(int cbid)
        {
            long money = 0;
            var come = context.Finance.Where(m => m.status == 0 && m.cbid==cbid).ToList();
            var to = context.Finance.Where(m => m.status == 1 && m.cbid == cbid).ToList();
            foreach(var i in come)
            {
                money += i.moneys;
            }
            foreach (var i in to)
            {
                money -= i.moneys;
            }
            return money;
        }

        public void insertFinance(Finance finance)
        {
            context.Entry(finance).State = EntityState.Added;
            context.SaveChanges();
        }

        public dynamic revanue(int year, int cbid)
        {
            var come = context.Finance
                .Where(m => m.createday.Year == year && m.status == 0 && m.cbid==cbid)
                .GroupBy(m => m.createday.Month)
                .Select(
                        cl => new {
                            month = cl.First().createday.Month,
                            total = cl.Sum(x => x.moneys)
                        }).ToList();
            var to = context.Finance
                .Where(m => m.createday.Year == year && m.status == 1)
                .GroupBy(m => m.createday.Month)
                .Select(
                        cl => new {
                            month = cl.First().createday.Month,
                            total = cl.Sum(x => x.moneys)
                        }).ToList();
            return new { come,to};

        }

        public void updateFinance(Finance finance)
        {
            context.Update(finance);
            context.SaveChanges();
        }
    }
}
