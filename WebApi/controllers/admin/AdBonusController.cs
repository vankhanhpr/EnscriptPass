using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AdhererClassLib.area.request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.model;
using WebApi.model.request;
using WebApi.model.roles;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.model;

namespace WebApi.controllers.admin
{
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdBonusController : Controller
    {
        private IAdBonusResponsitory m_adBonusResponsitory;
        public AdBonusController(IAdBonusResponsitory adBonusResponsitory)
        {
            m_adBonusResponsitory = adBonusResponsitory;
        }

        [HttpGet("getBonuss")]
        public DataRespond getBonuss(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adBonusResponsitory.getAllBonus(id);
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

                m_adBonusResponsitory.insertBonus(bn);
                data.success= true;
                data.message = "insert success";
            }
            catch(Exception e)
            {
                data.error = e;
                data.message = e.Message;
                data.success = false;
            }
            return data;
        }

        [HttpGet("getBonusById")]
        public DataRespond getBonusById(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adBonusResponsitory.getBonusById(id);
                data.message = "success";
            }
            catch(Exception e)
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
                Bonus bn = m_adBonusResponsitory.getBonusById(bnrq.bnid);
                bn.noidung = bnrq.noidung;
                bn.donvi = bnrq.donvi;
                bn.ghichu = bnrq.ghichu;
                DateTime daycrt = DateTime.ParseExact(bnrq.daycreate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                bn.daycreate = daycrt;

                m_adBonusResponsitory.updateBonus(bn);
                data.success = true;
                data.message = "update success";
            }
            catch(Exception e)
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
                m_adBonusResponsitory.deleteBonus(id);
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

        [HttpPost("getBonusByCbid")]
        public DataRespond getBonusByCbid(BonusFilter bonusFilter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adBonusResponsitory.getBonusByCbid(bonusFilter);
                data.message = "success";
            }
            catch(Exception e)
            {
                data.success = false;
                data.message = e.Message;
                data.error = e;
            }
            return data;
        }

        [HttpPost("filterBonusByBox")]
        public DataRespond filteBonusByBox(BonusFilter bonusFilter)
        {
            DataRespond data = new DataRespond();
            try
            {
                data.success = true;
                data.data = m_adBonusResponsitory.filterBonusByBox(bonusFilter);
                data.message = "filter success";
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }

        [HttpGet("acceptBonus")]
        public DataRespond acceptBonus(int id)
        {
            DataRespond data = new DataRespond();
            try
            {
                Bonus bonus = m_adBonusResponsitory.getBonusById(id);
                bonus.accept = false;
                m_adBonusResponsitory.updateBonus(bonus);
                data.success = true;
                data.message = "success";
            }
            catch(Exception e)
            {
                data.message = e.Message;
                data.error = e;
                data.success = false;
            }
            return data;
        }
    }
}