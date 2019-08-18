using IMDBShow.SharedEntities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace IMDBShow.Models
{
    public class IMDBDataAccessLayer
    {
        IMDBIntegrationContext db = new IMDBIntegrationContext();

        public IEnumerable<UserShow> GetMyShows(int userId)
        {
            try
            {
                return db.UserShow.Where(x => x.UserId == userId).ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddShow(Show show, int userId)
        {
            try
            {
                var showExist = db.UserShow.Any(x => x.ShowId == show.ShowId && x.UserId == userId);
                if (showExist)
                {
                    return 3;
                }
                var userShow = new UserShow();
                userShow.UserId = userId;
                userShow.ShowId = show.ShowId;
                userShow.CreatedDate = DateTime.UtcNow;
                userShow.CreatedBy = userId;
                userShow.NextEpisodeId = show.NextEpisodeId;
                db.UserShow.Add(userShow);
                db.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int UpdateNextEpisode(Show show, int userId)
        {
            try
            {
                var currentShow = db.UserShow.Where(x => x.ShowId == show.SeriesId && x.UserId == userId).FirstOrDefault();
                if (currentShow != null)
                {
                    if (currentShow.NextEpisodeId == show.NextEpisodeId)
                    {
                        return 3;
                    }
                    currentShow.NextEpisodeId = show.NextEpisodeId;
                    currentShow.ModifiedDate = DateTime.UtcNow;
                    currentShow.ModifiedBy = userId;
                    db.Entry(currentShow).State = EntityState.Modified;
                    var userWatchedShow = new UserWatchedShow();
                    userWatchedShow.UserId = userId;
                    userWatchedShow.ShowId = show.ShowId;
                    userWatchedShow.CreatedDate = DateTime.UtcNow;
                    userWatchedShow.CreatedBy = userId;
                    db.UserWatchedShow.Add(userWatchedShow);
                    db.SaveChanges();
                    return 1;
                }
                return 4;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int DeleteShow(string id, int userId)
        {
            try
            {
                UserShow shw = db.UserShow.Where(x => x.ShowId == id && x.UserId == userId).FirstOrDefault();
                db.UserShow.Remove(shw);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public User IsUserAuthenticated(string userName, string Password)
        {
            return db.User.Where(x => x.UserName == userName && x.PasswordHash == Password).FirstOrDefault();
        }
    }

    public class ImdbEntity
    {
        public string Title { get; set; }
        public string Year { get; set; }
        public string Rated { get; set; }
        public string Released { get; set; }
        public string Runtime { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public string Writer { get; set; }
        public string Actors { get; set; }
        public string Plot { get; set; }
        public string Language { get; set; }
        public string Country { get; set; }
        public string Awards { get; set; }
        public string Poster { get; set; }
        public string Metascore { get; set; }
        public string imdbRating { get; set; }
        public string imdbVotes { get; set; }
        public string imdbID { get; set; }
        public string Type { get; set; }
        public string Response { get; set; }
        public int Season { get; set; }
        public int TotalSeasons { get; set; }
        public string SeriesID { get; set; }
        public IEnumerable<NextEpisode> Episodes { get; set; }
    }

    public class NextEpisode
    {
        public string Title { get; set; }
        public string Released { get; set; }
        public int Episode { get; set; }
        public string imdbRating { get; set; }
        public string imdbID { get; set; }
    }
}
