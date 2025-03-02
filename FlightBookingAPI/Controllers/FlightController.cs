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
        [HttpGet("user-flights/{username}")]
        public IActionResult GetUserFlights(string username, [FromQuery] string status)
        {
            var user = _context.Users.Include(u => u.Reservations)
                                     .ThenInclude(r => r.Flight)
                                     .FirstOrDefault(u => u.Username == username);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var flights = user.Reservations.Select(r => r.Flight).AsQueryable();

            // Filtriranje po statusu (ako je zadat)
            if (!string.IsNullOrEmpty(status))
            {
                if (Enum.TryParse(status, out FlightStatus flightStatus))
                {
                    flights = flights.Where(f => f.Status == flightStatus);
                }
                else
                {
                    return BadRequest(new { message = "Invalid flight status" });
                }
            }

            return Ok(flights.Select(f => new
            {
                f.Id,
                f.DepartureLocation,
                f.Destination,
                f.DepartureTime,
                f.ArrivalTime,
                f.Price,
                f.AvailableSeats,
                f.BookedSeats,
                Status = f.Status.ToString()
            }));
        }
    }
}
