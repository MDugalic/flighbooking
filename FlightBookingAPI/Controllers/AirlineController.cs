using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Persistence;
using Domain.Entities;
namespace FlightBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AirlineController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("airlines")]
        public IActionResult GetAirlines() 
        {
            var airlines = _context.Airlines
                .Select(a => new
                {
                    a.Id,
                    a.Name,
                    a.Address,
                    a.ContactInfo
                })
                .ToList();
            return Ok(airlines);
        }

    }
}
