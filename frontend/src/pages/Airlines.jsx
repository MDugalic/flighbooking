import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import planeImage from "../assets/plane.jpg"; // Dodajemo sliku
const API_URL = import.meta.env.VITE_API_URL;

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/airline/airlines`)
      .then(response => setAirlines(response.data))
      .catch(error => console.error("Error fetching airlines:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Available Airlines</h1>
      <div className="row">
        {airlines.length > 0 ? (
          airlines.map(airline => (
            <div key={airline.id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{airline.name}</h5>
                  <p className="card-text"><strong>Address:</strong> {airline.address}</p>
                  <p className="card-text"><strong>Contact:</strong> {airline.contactInfo}</p>
                </div>
                {/* Ovde dodaj putanju do slike */}
                <img src={planeImage} className="card-img-bottom" alt="Airplane" />
                <div className="card-footer text-center">
                  <Link to={`/airlines/${airline.id}/reviews`} className="btn btn-primary">View Reviews</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No airlines available.</p>
        )}
      </div>
    </div>
  );
};

export default Airlines;