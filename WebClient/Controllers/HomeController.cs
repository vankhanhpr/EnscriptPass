using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebClient.Models;

namespace WebClient.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Changepassword(int? id)
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
        public IActionResult Reward(int? id)
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

        public IActionResult Discipline(int? id)
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
        //public IActionResult Family(int fileid)
        //{
        //    return View();
        //}
        public IActionResult Family(int? id)
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
        public IActionResult Form(int? id)
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



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
