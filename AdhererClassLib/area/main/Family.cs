using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Family
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int fmlid { get; set; }
        public int fileid { get; set;}
        public string quanhe { get; set; }
        public string nghenghiep { get; set; }
        public string hoancanhkinhte { get; set;}
        public string lichsuchinhtri { get; set; }
        public DateTime updateday { get; set; }
        public string name { get; set; }
        public DateTime birthday { get; set; }

    }
}
