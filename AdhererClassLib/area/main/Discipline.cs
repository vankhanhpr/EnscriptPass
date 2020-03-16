using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Discipline
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int dsid { get; set; }
        public int fileid { get; set; }
        public string noidung { get; set; }
        public string ghichu { get; set; }
        public DateTime updateday { get; set; }
        public DateTime daycreate { get; set; }
        public Boolean approved { get; set; }
        public Boolean active { get; set; }
        public string donvi { get; set; }
        public Boolean accept { get; set; }
    }
}
