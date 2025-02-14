using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public enum UserType { Passenger, Admin }
    public class User
    {



        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public UserType UserType { get; set; }

        // Lista rezervacija korisnika
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();


    }
}


