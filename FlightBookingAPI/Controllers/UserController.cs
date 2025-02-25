using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain.Entities;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace FlightBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Email already exists.");
            }
            //Hashovanje lozinke pre nego sto je sacuvamo
            user.PasswordHash = HashPassword(user.PasswordHash);

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered succesfully" });
        }

        private string HashPassword(string password) {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes) 
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
