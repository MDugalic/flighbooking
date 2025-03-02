import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile(token);
    }
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/user/profile/update`, {
        firstName: user.firstName,
        lastName: user.lastName
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Profile</h2>
      <form onSubmit={handleUpdate} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" value={user.username} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={user.email} disabled />
        </div>
        <button type="submit" className="btn btn-success w-100">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;