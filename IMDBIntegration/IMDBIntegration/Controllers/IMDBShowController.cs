using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IMDBShow.Models;
using System.Net.Http;
using Newtonsoft.Json;
using IMDBShow.SharedEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IMDBShow.Controllers
{
    [Authorize]
    public class IMDBShowController : Controller
    {
        IMDBDataAccessLayer objIMDBShow = new IMDBDataAccessLayer();
        IConfiguration configuration;

        public IMDBShowController(IConfiguration iConfig)
        {
            configuration = iConfig;
        }

        [HttpGet]
        [Route("api/IMDBShow/GetMyShows")]
        public IEnumerable<Show> GetMyShows()
        {
            var shows = objIMDBShow.GetMyShows(GetCurrentUserId());
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
            show.SeriesId = show.ShowId;
            show.Season = 1;
            var nextEpisode = GetNextEpisodeId(show);
            if (nextEpisode != null)
            {
                show.NextEpisodeId = nextEpisode.imdbID;
                return objIMDBShow.AddShow(show, GetCurrentUserId());
            }
            else return 2;
        }

        [HttpPut]
        [Route("api/IMDBShow/MarkWatched")]
        public int MarkWatched([FromBody] Show show)
        {
            var nextEpisode = GetNextEpisodeId(show);
            if (nextEpisode != null)
            {
                show.NextEpisodeId = nextEpisode.imdbID;
                return objIMDBShow.UpdateNextEpisode(show, GetCurrentUserId());
            }
            return 2;
        }

        [HttpGet]
        [Route("api/IMDBShow/Details/{id}")]
        public ImdbEntity Details(string id)
        {
            return GetShowById(id);
        }

        [HttpDelete]
        [Route("api/IMDBShow/Delete/{id}")]
        public int Delete(string id)
        {
            return objIMDBShow.DeleteShow(id, GetCurrentUserId());
        }

        private ImdbEntity GetShowById(string id)
        {
            string key = configuration.GetValue<string>("MySettings:ImdbKey");

            string url = "http://www.omdbapi.com/?i=" + id + "&apikey=" + key;

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
            NextEpisode nextEpisode = null;
            using (var client = new HttpClient())
            {
                var content = client.GetStringAsync(url).Result;
                var show = JsonConvert.DeserializeObject<ImdbEntity>(content);

                if (show != null && show.Episodes != null && show.Episodes.Any())
                {
                    if (currentShow.SeriesId == currentShow.ShowId)
                    {
                        nextEpisode = show.Episodes.OrderBy(x => x.Episode).FirstOrDefault();
                        return nextEpisode;
                    }

                    var currentEpisode = show.Episodes.Where(x => x.imdbID == currentShow.ShowId).FirstOrDefault();
                    nextEpisode = show.Episodes.Where(x => x.Episode > currentEpisode.Episode).OrderBy(x => x.Episode).FirstOrDefault();

                    //if (nextEpisode == null && show.TotalSeasons == currentShow.Season)
                    //{
                    //    return null;
                    //}
                    if (nextEpisode == null && show.TotalSeasons > currentShow.Season)
                    {
                        url = "http://www.omdbapi.com/?i=" + currentShow.SeriesId + "&apikey=cca62f46&season=" + (currentShow.Season + 1);
                        content = client.GetStringAsync(url).Result;
                        show = JsonConvert.DeserializeObject<ImdbEntity>(content);
                        if (show != null && show.Episodes != null && show.Episodes.Any())
                        {
                            nextEpisode = show.Episodes.OrderBy(x => x.Episode).FirstOrDefault();
                            return nextEpisode;
                        }
                    }
                }
                return nextEpisode;
            }
        }

        private int GetCurrentUserId()
        {
            return int.Parse(this.User.Identity.Name);
        }

    }
}
