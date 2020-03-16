using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.model.request;
using WebApi.serrvice.admin.model;
using WebApi.serrvice.user.interfaces;
using WebApi.serrvice.user.responsitory;

namespace WebApi.controllers.user
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BonusController : Controller
    {
        private IBonusResponsitory m_BonusResponsitory;
        public BonusController(IBonusResponsitory BonusResponsitory)
        {
            m_BonusResponsitory = BonusResponsitory;
        }

        [HttpGet("getBonus")]
        public DataRespond getBonus(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_BonusResponsitory.getAllBonus(id);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpPost("insertBonus")]
        public DataRespond insertBonus([FromBody]BonusRequest bnrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Bonus bn = new Bonus();
                bn.fileid = bnrq.fileid;
                bn.donvi = bnrq.donvi;
                bn.ghichu = bnrq.ghichu;
                bn.noidung = bnrq.noidung;
                DateTime daycrt = DateTime.ParseExact(bnrq.daycreate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                bn.daycreate = daycrt;
                bn.updateday = DateTime.Now;
                bn.accept = true;

                m_BonusResponsitory.insertBonus(bn);
                data.success = true;
                data.message = "insert success";
                data.data = m_BonusResponsitory.findBonusById(bn.bnid);
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("getBonusById")]
        public DataRespond getbonusById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_BonusResponsitory.findBonusById(id);
                data.message = "success";
            }
            catch (Exception e)
            {
                data.success = false;
                data.error = e;
                data.message = e.Message;
            }
            return data;
        }

        [HttpPost("updateBonus")]
        public DataRespond updateBonus(BonusRequest bnrq)
        {
            DataRespond data = new DataRespond();
            try
            {
                Bonus bn = m_BonusResponsitory.findBonusById(bnrq.bnid);
                bn.noidung = bnrq.noidung;
                bn.donvi = bnrq.donvi;
                bn.ghichu = bnrq.ghichu;
                DateTime daycrt = DateTime.ParseExact(bnrq.daycreate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                bn.daycreate = daycrt;

                m_BonusResponsitory.updateBonus(bn);
                data.success = true;
                data.message = "update success";
                data.data = m_BonusResponsitory.findBonusById(bn.bnid);
            }
            catch (Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpGet("deleteBonus")]
        public DataRespond deleteBonus(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                m_BonusResponsitory.deleteBonus(id);
                data.message = "delete success";
            }
            catch (Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }
    }
}