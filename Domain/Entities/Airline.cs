using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Airline
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactInfo { get; set; }

        // Letovi koje nudi aviokompanija
        public ICollection<Flight> Flights { get; set; } = new List<Flight>();

        // Recenzije aviokompanije
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
