using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int usid { get; set; }
        public string madv { get; set; }
        public DateTime ngaydenchibo { get; set; }
        public DateTime createday { get; set; }
        public string password { get; set; }
        public int roleid { get; set; }
        public Boolean active { get; set; }
        public Boolean accept { get; set; }
        public string giaygioithieu { get; set; }
        public string noisinhhoatcu { get; set; }
    }
}
