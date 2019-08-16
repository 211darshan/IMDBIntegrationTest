using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IMDBShow.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IMDBShow.Controllers
{
    public class IMDBShowController : Controller
    {
        IMDBDataAccessLayer objIMDBShow = new IMDBDataAccessLayer();
        
        [HttpGet]
        [Route("api/IMDBShow/GetMyShows")]
        public IEnumerable<UserShow> GetMyShows()
        {
            return objIMDBShow.GetMyShows();
        }
        
    }
}
