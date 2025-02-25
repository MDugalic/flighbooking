import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Profile</h2>
      <p className="text-center">Welcome, {username}!</p>
      <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;