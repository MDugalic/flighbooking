import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

const fetchFlights = async () => {
  try {
    const response = await axios.get(`${API_URL}/flights`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
};

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights().then(setFlights);
  }, []);

  return (
    <div>
      <h1>Flight Booking System</h1>
      <ul>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <li key={flight.id}>
              {flight.departureLocation} → {flight.destination} (${flight.price})
            </li>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </ul>
    </div>
  );
}

export default App;