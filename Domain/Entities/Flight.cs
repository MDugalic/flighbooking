using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public enum FlightStatus { Active, Canceled, Completed }

    public class Flight
    {
        public int Id { get; set; }
        public int AirlineId { get; set; }
        public Airline Airline { get; set; }

        public string DepartureLocation { get; set; }
        public string Destination { get; set; }

        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }

        public int AvailableSeats { get; set; }
        public int BookedSeats { get; set; }
        public decimal Price { get; set; }
        public FlightStatus Status { get; set; }

        // Lista rezervacija za let
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
