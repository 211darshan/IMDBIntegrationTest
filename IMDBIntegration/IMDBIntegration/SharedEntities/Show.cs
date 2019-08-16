using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMDBShow.SharedEntities
{
    public class Show
    {
        public string ShowId { get; set; }
        public string ShowTitle { get; set; }
        public string NextEpisodeId { get; set; }
        public string NextEpisodeTitle { get; set; }
        public string Season { get; internal set; }
    }
}
