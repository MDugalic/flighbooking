using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public enum ReviewStatus { Created, Approved, Rejected }

    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User Reviewer { get; set; }

        public int AirlineId { get; set; }
        public Airline Airline { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; } // Opcioni parametar
        public ReviewStatus Status { get; set; }
    }
}
