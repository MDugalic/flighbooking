import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [status, setStatus] = useState("All");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      fetchUserReservations(username, status);
    }
  }, [status, username]);

  const fetchUserReservations = async (username, status) => {
    try {
      let url = `${API_URL}/reservation/user-reservations/${username}`;
      if (status !== "All") {
        url += `?status=${status}`;
      }
      const response = await axios.get(url);
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Reservations</h2>

      {/* Dugmad za filtriranje rezervacija */}
      <div className="btn-group mb-3">
        <button className="btn btn-outline-primary" onClick={() => setStatus("All")}>All</button>
        <button className="btn btn-outline-warning" onClick={() => setStatus("Created")}>Created</button>
        <button className="btn btn-outline-success" onClick={() => setStatus("Approved")}>Approved</button>
        <button className="btn btn-outline-danger" onClick={() => setStatus("Canceled")}>Canceled</button>
        <button className="btn btn-outline-secondary" onClick={() => setStatus("Completed")}>Completed</button>
      </div>

      <div className="row">
        {reservations.length > 0 ? (
          reservations.map(reservation => (
            <div key={reservation.id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{reservation.departureLocation} → {reservation.destination}</h5>
                  <p className="card-text"><strong>Departure:</strong> {new Date(reservation.departureTime).toLocaleString()}</p>
                  <p className="card-text"><strong>Arrival:</strong> {new Date(reservation.arrivalTime).toLocaleString()}</p>
                  <p className="card-text"><strong>Seats:</strong> {reservation.seatCount}</p>
                  <p className="card-text"><strong>Total Price:</strong> ${reservation.totalPrice}</p>
                  <p className="card-text"><strong>Status:</strong> {reservation.status}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No reservations found.</p>
        )}
      </div>
    </div>
  );
};

export default MyReservations;