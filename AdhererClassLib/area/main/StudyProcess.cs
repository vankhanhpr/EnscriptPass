using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AdhererClassLib.area.main
{
    public class StudyProcess
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int studyid { get; set; }
        public DateTime starttime { get; set; }
        public DateTime endtime { get; set; }
        public string process { get; set; }
	    public string graduationtype { get; set; }
	    public string degreetype { get; set; }
	    public Boolean active { get; set; }
        public Boolean accept { get; set; }
        public DateTime createday { get; set; }
        public int fileid { get; set; }
        public string adress { get; set; }
        public string typeofeducation { get; set; }
    }
}
