using System;
using System.Collections.Generic;
using System.Text;

namespace AdhererClassLib.area.main
{
    public class StudyProcessRequest
    {
        public int studyid { get; set; }
        public string starttime { get; set; }
        public string endtime { get; set; }
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
