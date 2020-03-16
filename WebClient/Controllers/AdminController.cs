using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebClient.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Index1()
        {
            return View();
        }
        public IActionResult DangBo()
        {
            return View();
        }
        public IActionResult ChiBo()
        {
            return View();
        }
        public IActionResult DonVi()
        {
            return View();
        }
        public IActionResult DangVien()
        {
            return View();
        }
        public IActionResult Form()
        {
            return View();
        }
        public IActionResult File(int? id)
        {
            int usid = id ?? 0;
            if (usid == 0)
            {
                return RedirectToAction("index", "home");
            }
            else
            {
                ViewBag.usid = usid;
                return View();
            }
        }
        public IActionResult Abroad(int? id)
        {
            int fileid = id ?? 0;
            if (fileid == 0)
            {
                return RedirectToAction("index", "home");
            }
            else
            {
                ViewBag.fileid = fileid;
                return View();
            }
        }
        public IActionResult Bonus()
        {
            return View();
        }

        public IActionResult Discripline()
        {
            return View();
        }
        public IActionResult NewAbroad()
        {
            return View();
        }
        public IActionResult DangVienMove()
        {
            return View();
        }

        public IActionResult Report()
        {
            return View();
        }
        public IActionResult DetailReport()
        {
            return View();
        }

        public IActionResult LivingAdherer()
        {
            return View();
        }
        public IActionResult Finance()
        {
            return View();
        }
        public IActionResult ManageUser()
        {
            return View();
        }
    }
}