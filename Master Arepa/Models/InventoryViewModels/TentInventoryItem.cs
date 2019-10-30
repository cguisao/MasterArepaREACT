using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Master_Arepa.Models.InventoryViewModels
{
    public class TentInventoryItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Item { get; set; }

        public string User { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}