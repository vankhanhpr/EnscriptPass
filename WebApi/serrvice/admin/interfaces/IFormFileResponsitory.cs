using AdhererClassLib.area.main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.interfaces.responsitory;

namespace WebApi.serrvice.admin.interfaces
{
    public interface IFormFileResponsitory:IResponsitory<FormFile>
    {
        dynamic getFileWidthIFormFile(int id);
        void insertFormFile(FormFile formFile);
        void updateFormFile(FormFile formFile);
        FormFile getFormFileById(int id);
        dynamic getOnlyFormFile(int id);
    }
}
