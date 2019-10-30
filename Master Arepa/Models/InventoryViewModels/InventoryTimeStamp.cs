using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Master_Arepa.Models.InventoryViewModels
{
    public class InventoryTimeStamp
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string InventoryType { get; set; }

        public string User { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}
