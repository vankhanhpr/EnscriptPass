using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.serrvice.admin.model
{
    public class Forms
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int formid { get; set; }
        public string nameform { get; set; }
        public string namefile { get; set; }
        public string note { get; set; }
        public DateTime updateday { get; set; }
        public Boolean active { get; set; }
        public int type { get; set; }
        public int cbid { get; set; }
    }
}
