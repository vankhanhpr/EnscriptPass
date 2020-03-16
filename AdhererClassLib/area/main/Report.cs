using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Report
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int rpid { get; set; }
        public string title { get; set; }
        public string   filename { get; set; }
        public DateTime reportday { get; set; }
        public DateTime createday { get; set; }
        public string note { get; set; }
        public int active { get; set; }
    }
}
