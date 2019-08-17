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
                    NextEpisodeId = show.NextEpisodeId,
                    NextEpisodeTitle = episodeDetails.Title,
                    Season = episodeDetails.Season
                });
            }
            return myShows;
        }

        [HttpPost]
        [Route("api/IMDBShow/AddShow")]
        public int AddShow([FromBody] Show show)
        {
            var nextEpisode = GetNextEpisodeId(show);
            if (nextEpisode != null)
            {
                show.NextEpisodeId = nextEpisode.imdbID;
                return objIMDBShow.AddShow(show);
            }
            else return 2;
        }

        [HttpPost]
        [Route("api/IMDBShow/MarkWatched")]
        public int MarkWatched([FromBody] Show show)
        {
            var nextEpisode = GetNextEpisodeId(show);
            if (nextEpisode != null)
            {
                show.NextEpisodeId = nextEpisode.imdbID;
                return objIMDBShow.UpdateNextEpisode(show);
            }
            else return 2;
        }

        [HttpGet]
        [Route("api/IMDBShow/Details/{id}")]
        public ImdbEntity Details(string id)
        {
            return GetShowById(id);
        }

        private ImdbEntity GetShowById(string id)
        {
            string url = "http://www.omdbapi.com/?i=" + id + "&apikey=cca62f46";

            using (var client = new HttpClient())
            {
                var content = client.GetStringAsync(url).Result;
                var show = JsonConvert.DeserializeObject<ImdbEntity>(content);
                return show;
            }
        }

        private NextEpisode GetNextEpisodeId(Show currentShow)
        {
            string url = "http://www.omdbapi.com/?i=" + currentShow.SeriesId + "&apikey=cca62f46&season=" + currentShow.Season;
            using (var client = new HttpClient())
            {
                var content = client.GetStringAsync(url).Result;
                var show = JsonConvert.DeserializeObject<ImdbEntity>(content);
                if (show != null && show.Episodes != null && show.Episodes.Any())
                {
                    var currentEpisode = show.Episodes.Where(x => x.imdbID == currentShow.ShowId).FirstOrDefault();
                    var nextSposide = show.Episodes.Where(x => x.Episode > currentEpisode.Episode).OrderBy(x => x.Episode).FirstOrDefault();
                    if (nextSposide == null && show.TotalSeasons == currentShow.Season)
                    {
                        return null;
                    }
                    else if (nextSposide == null && show.TotalSeasons > currentShow.Season)
                    {
                        url = "http://www.omdbapi.com/?i=" + currentShow.SeriesId + "&apikey=cca62f46&season=" + currentShow.Season + 1;
                        content = client.GetStringAsync(url).Result;
                        show = JsonConvert.DeserializeObject<ImdbEntity>(content);
                        if (show != null && show.Episodes != null && show.Episodes.Any())
                        {
                            return show.Episodes.FirstOrDefault();
                        }
                    }
                    else
                    {
                        return nextSposide;
                    }
                }

                return null;
            }
        }
    }

}
