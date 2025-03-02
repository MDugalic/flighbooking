import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MyFlights = () => {
  const [flights, setFlights] = useState([]);
  const [status, setStatus] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      fetchUserFlights(username, status);
    }
  }, [status]);

  const fetchUserFlights = async (username, status) => {
    try {
      const response = await axios.get(`${API_URL}/flight/user-flights/${username}?status=${status}`);
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Flights</h2>

      {/* Dugmad za filtriranje */}
      <div className="btn-group mb-3">
        <button className="btn btn-outline-primary" onClick={() => setStatus("")}>All</button>
        <button className="btn btn-outline-success" onClick={() => setStatus("Active")}>Active</button>
        <button className="btn btn-outline-secondary" onClick={() => setStatus("Completed")}>Completed</button>
        <button className="btn btn-outline-danger" onClick={() => setStatus("Canceled")}>Canceled</button>
      </div>

      <div className="row">
        {flights.length > 0 ? (
          flights.map(flight => (
            <div key={flight.id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{flight.departureLocation} → {flight.destination}</h5>
                  <p className="card-text"><strong>Price:</strong> ${flight.price}</p>
                  <p className="card-text"><strong>Status:</strong> {flight.status}</p>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No flights found.</p>
        )}
      </div>
    </div>
  );
};

export default MyFlights;