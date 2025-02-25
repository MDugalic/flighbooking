import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    userType: "Passenger",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/register`, {
        ...user,
        passwordHash: user.password, // Lozinka će biti hashovana na backendu
        userType: user.userType === "Passenger" ? 0 : 1, // Enumi se šalju kao brojevi
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-control" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-control" name="gender" value={user.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">User Type</label>
          <select className="form-control" name="userType" value={user.userType} onChange={handleChange} required>
            <option value="Passenger">Passenger</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;