using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.serrvice.admin.model
{
    public class AdhererLiving
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int livid { get; set; }
        public string title { get; set; }
        public DateTime dayevent { get; set; }
        public string note { get; set; }
        public string namefile { get; set; }
        public DateTime createday { get; set; }
        public int cbid { get; set; }
    }
}
