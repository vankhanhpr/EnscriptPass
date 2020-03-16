using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Toabroad
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int brid { get; set; }
        public int fileid { get; set; }
        public string noiden { get; set; }
        public string lydo { get; set; }
        public DateTime thoigiandi { get; set; }
        public DateTime thoigiantrove { get; set; }
        public DateTime createday { get; set; }
        public Boolean active { get; set; }
        public Boolean status { get; set; }
        public Boolean accept { get; set; }
    }
}
