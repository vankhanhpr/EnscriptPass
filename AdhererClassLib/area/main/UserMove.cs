using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AdhererClassLib.area.main
{
    public class UserMove
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int usmoveid { get; set; }
        public int usid { get; set; }
        public string filereview { get; set; }
        public string tranfer { get; set; }
        public string addresstogo { get; set; }
        public DateTime createday { get; set; }
        public Boolean accept { get; set; }
    }
}
