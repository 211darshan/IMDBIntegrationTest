using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IMDBShow.Models;
using System.Net.Http;
using Newtonsoft.Json;
using IMDBShow.SharedEntities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IMDBShow.Controllers
{
    public class IMDBShowController : Controller
    {
        IMDBDataAccessLayer objIMDBShow = new IMDBDataAccessLayer();

        [HttpGet]
        [Route("api/IMDBShow/GetMyShows")]
        public IEnumerable<Show> GetMyShows()
        {
            var shows = objIMDBShow.GetMyShows();
            List<Show> myShows = new List<Show>();
            foreach (var show in shows)
            {
                var showDetails = GetShowById(show.ShowId);
                var episodeDetails = GetShowById(show.NextEpisodeId);

                myShows.Add(new Show
                {
                    ShowId = show.ShowId,
                    ShowTitle = showDetails.Title,
                    NextEpisodeId = show.ShowId,
                    NextEpisodeTitle = episodeDetails.Title,
                    Season = episodeDetails.Season
                });
            }
            return myShows;
        }

        private ImdbEntity GetShowById(string id)
        {
            string url = "http://www.omdbapi.com/?i="+ id + "&apikey=cca62f46";

            using (var client = new HttpClient())
            {
                var content = client.GetStringAsync(url).Result;
                var show = JsonConvert.DeserializeObject<ImdbEntity>(content);
                return show;
            }
        }

    }
}
