using AdhererClassLib.area.main;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.responsitory;
using WebApi.serrvice.admin.interfaces;

namespace WebApi.serrvice.admin.responsitory
{
    public class FormFileResponsitory : Responsitory<FormFile>, IFormFileResponsitory
    {
        private DbSet<FormFile> formFilesEntiry;
        public FormFileResponsitory(MyDBContext context) : base(context)
        {
            formFilesEntiry = context.Set<FormFile>();
        }

        public dynamic getFileWidthIFormFile(int id)
        {
            var temp = (from user in context.Users
                        join file in context.Files
                        on user.usid equals file.usid
                        join formfile in context.FormFile
                        on file.fileid equals formfile.fileid
                        where (file.ngayvaodangct > DateTime.Now
                        && user.active == true && file.cbid== id)
                        select new
                        {
                            user.usid,
                            file.hotendangdung,
                            file.ngayvaodangct,
                            user.madv,
                            file.fileid,
                            file.ngayvaodangdb,
                            file.avatar,
                            formfile
                        }).ToList();
            return temp;
        }

        public FormFile getFormFileById(int id)
        {
            return context.FormFile.Where(m => m.formfileid == id).FirstOrDefault();
        }

        public dynamic getOnlyFormFile(int id)
        {
            var temp = (from user in context.Users
                        join file in context.Files
                        on user.usid equals file.usid
                        join formfile in context.FormFile
                        on file.fileid equals formfile.fileid
                        where (file.ngayvaodangct > DateTime.Now
                        && formfile.formfileid == id
                        && user.active == true)
                        select new
                        {
                            user.usid,
                            file.hotendangdung,
                            file.ngayvaodangct,
                            user.madv,
                            file.fileid,
                            file.ngayvaodangdb,
                            file.avatar,
                            formfile
                        }).FirstOrDefault();
            return temp;
        }

        public void insertFormFile(FormFile formFile)
        {
            context.Entry(formFile).State = EntityState.Added;
            context.SaveChanges();
        }

        public void updateFormFile(FormFile formFile)
        {
            context.Update(formFile);
            context.SaveChanges();
        }
    }
}
