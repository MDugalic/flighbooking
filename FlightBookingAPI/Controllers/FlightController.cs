using Domain.Entities;
using Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlightBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController] // Dodaj ovo!
    public class FlightController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FlightController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("flights")] // Definiši rutu!
        public IActionResult GetFlights()
        {
            var flights = _context.Flights
                .Select(f => new {
                    f.Id,
                    f.DepartureLocation,
                    f.Destination,
                    f.DepartureTime,
                    f.ArrivalTime,
                    f.Price,
                    f.AvailableSeats,
                    f.BookedSeats,
                    AirlineName = f.Airline.Name,
                    Status = f.Status.ToString() // Enum to string
                })
                .ToList();

            return Ok(flights);
        }
    }
}
