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
        IMDBIntegrationContext ctx=new IMDBIntegrationContext();

        public IEnumerable<UserShow> GetMyShows()
        {
            try
            {

                string url = "http://www.omdbapi.com/?i=tt3896198&apikey=cca62f46";

                using (var client = new HttpClient())
                {
                    var content = client.GetStringAsync(url).Result;
                    var dd = JsonConvert.DeserializeObject<ImdbEntity>(content);
                }
                return ctx.UserShow.ToList();

                //using (WebClient wc = new WebClient())
                //{
                //    var json = wc.DownloadString(url);
                //    JavaScriptSerializer oJS = new JavaScriptSerializer();
                //    ImdbEntity obj = new ImdbEntity();
                //    obj = oJS.Deserialize<ImdbEntity>(json);
                //    if (obj.Response == "True")
                //    {
                //        txtActor.Text = obj.Actors;
                //        txtDirector.Text = obj.Director;
                //        txtYear.Text = obj.Year;

                //    }
                //    else
                //    {
                //        MessageBox.Show("Movie not Found!!!");
                //    }


                //}




            }
            catch
            {
                throw;
            }
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
        public string Season { get; set; }
    }
}
