using System;
using System.Collections.Generic;
using System.Text;

namespace AdhererClassLib.area.request
{
    public class FinanceRequest
    {
        public int financeid { get; set; }
        public string name { get; set; }
        public string createday { get; set; }
        public long moneys { get; set; }
        public int status { get; set; }
        public int cbid { get; set; }
        public int uscreate { get; set; }
        public string person { get; set; }
    }
}
