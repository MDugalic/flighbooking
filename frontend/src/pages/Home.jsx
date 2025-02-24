import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [search, setSearch] = useState({
    departureLocation: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
    airline: "",
  });

  useEffect(() => {
    axios.get(`${API_URL}/flight/flights`)
      .then(response => {
        const activeFlights = response.data.filter(flight => flight.status === "Active");
        setFlights(activeFlights);
        setFilteredFlights(activeFlights);
      })
      .catch(error => console.error("Error fetching flights:", error));
  }, []);

  // Funkcija za filtriranje letova
  const handleSearch = () => {
    const filtered = flights.filter(flight => {
      return (
        (search.departureLocation === "" || flight.departureLocation.toLowerCase().includes(search.departureLocation.toLowerCase())) &&
        (search.destination === "" || flight.destination.toLowerCase().includes(search.destination.toLowerCase())) &&
        (search.departureDate === "" || flight.departureTime.startsWith(search.departureDate)) &&
        (search.arrivalDate === "" || flight.arrivalTime.startsWith(search.arrivalDate)) &&
        (search.airline === "" || flight.airlineName.toLowerCase().includes(search.airline.toLowerCase()))
      );
    });
    setFilteredFlights(filtered);
  };

  // Funkcija za sortiranje letova po ceni rastuće
  const handleSortAscending = () => {
    const sortedFlights = [...filteredFlights].sort((a, b) => a.price - b.price);
    setFilteredFlights(sortedFlights);
  };

  // Funkcija za sortiranje letova po ceni opadajuće
  const handleSortDescending = () => {
    const sortedFlights = [...filteredFlights].sort((a, b) => b.price - a.price);
    setFilteredFlights(sortedFlights);
  };

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">Available Flights</h1>

      {/* Pretraga */}
      <div className="card p-3 mb-4">
        <h5>Search Flights</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Departure Location" 
              value={search.departureLocation} 
              onChange={(e) => setSearch({ ...search, departureLocation: e.target.value })} 
            />
          </div>
          <div className="col-md-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Destination" 
              value={search.destination} 
              onChange={(e) => setSearch({ ...search, destination: e.target.value })} 
            />
          </div>
          <div className="col-md-2">
            <input 
              type="date" 
              className="form-control" 
              value={search.departureDate} 
              onChange={(e) => setSearch({ ...search, departureDate: e.target.value })} 
            />
          </div>
          <div className="col-md-2">
            <input 
              type="date" 
              className="form-control" 
              value={search.arrivalDate} 
              onChange={(e) => setSearch({ ...search, arrivalDate: e.target.value })} 
            />
          </div>
          <div className="col-md-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Airline" 
              value={search.airline} 
              onChange={(e) => setSearch({ ...search, airline: e.target.value })} 
            />
          </div>
          <div className="col-md-12 text-center">
            <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      {/* Dugmad za sortiranje */}
      <div className="text-center mb-3">
        <button className="btn btn-success me-2" onClick={handleSortAscending}>Sort by Price (Ascending)</button>
        <button className="btn btn-danger" onClick={handleSortDescending}>Sort by Price (Descending)</button>
      </div>

      {/* Lista letova */}
      <div className="row">
        {filteredFlights.length > 0 ? (
          filteredFlights.map(flight => (
            <div key={flight.id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{flight.departureLocation} → {flight.destination}</h5>
                  <p className="card-text"><strong>Airline:</strong> {flight.airlineName}</p>
                  <p className="card-text"><strong>Price:</strong> ${flight.price.toFixed(2)}</p> {/* Dodali smo cenu */}
                  <p className="card-text"><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                  <p className="card-text"><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No flights match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;