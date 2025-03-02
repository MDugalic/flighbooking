using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace FlightBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ReservationController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("user-reservations/{username}")]
        public async Task<IActionResult> GetUserReservations(string username, [FromQuery] string status = "")
        {
            var user = await _context.Users
                .Include(u => u.Reservations)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return NotFound("User not found");

            var reservations = user.Reservations
                .Where(r => string.IsNullOrEmpty(status) || r.Status.ToString() == status)
                .Select(r => new
                {
                    r.Id,
                    r.Flight.DepartureLocation,
                    r.Flight.Destination,
                    r.Flight.DepartureTime,
                    r.Flight.ArrivalTime,
                    r.NumberOfPassengers,
                    r.TotalPrice,
                    Status = r.Status.ToString()
                })
                .ToList();

            return Ok(reservations);
        }
    }
}
