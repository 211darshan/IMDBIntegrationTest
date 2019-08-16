using System;
using System.Collections.Generic;

namespace IMDBShow.Models
{
    public partial class UserShow
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ShowId { get; set; }
        public string NextEpisodeId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }

        public User User { get; set; }
    }
}
