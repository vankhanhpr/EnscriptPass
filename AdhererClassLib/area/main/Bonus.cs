using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Bonus
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int bnid { get; set; }
        public int fileid { get; set; }
        public string noidung { get; set; }
        public string donvi { get; set; }
        public string ghichu { get; set; }
        public DateTime daycreate { get; set; }
        public DateTime updateday { get; set; }
        public Boolean accept { get; set; }
    }
}
