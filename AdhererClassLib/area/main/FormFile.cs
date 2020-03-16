using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AdhererClassLib.area.main
{
    public class FormFile
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int formfileid { get; set; }
        public string bantukiemdiem { get; set; }
        public string giaychungnhanboiduong { get; set; }
        public string nhanxetnguoihd { get; set; }
        public string nhanxetchibo { get; set; }
        public string quydinhketnap { get; set; }
        public int fileid { get; set; }
    }
}
