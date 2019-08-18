using System;
using System.Collections.Generic;

namespace IMDBShow.Models
{
    public partial class User
    {
        public User()
        {
            UserShow = new HashSet<UserShow>();
            UserWatchedShow = new HashSet<UserWatchedShow>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }

        public ICollection<UserShow> UserShow { get; set; }
        public ICollection<UserWatchedShow> UserWatchedShow { get; set; }
    }
}
