using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AdhererClassLib.area.main
{
    public class WorkingProcess
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int workingid { get; set; }
        public DateTime starttime { get; set; }
        public DateTime endtime { get; set; }
        public string process { get; set; }
        public string address { get; set; }
        public string title { get; set; }
        public DateTime createday { get; set; }
        public Boolean active { get; set; }
        public Boolean accept { get; set; }
        public int fileid { get; set; }
        public string organization { get; set; }

    }
}
