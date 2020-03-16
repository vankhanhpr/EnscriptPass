using System;
using System.Collections.Generic;
using System.Text;

namespace AdhererClassLib.area.request
{
    public class WorkingProcessRequest
    {
        public int workingid { get; set; }
        public string starttime { get; set; }
        public string endtime { get; set; }
        public string process { get; set; }
        public string address { get; set; }
        public string title { get; set; }
        public int fileid { get; set; }
        public string organization { get; set; }
    }
}
