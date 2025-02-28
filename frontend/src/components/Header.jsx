import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 📌 Učitavanje korisnika pri pokretanju aplikacije
  useEffect(() => {
    const updateUser = () => {
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");
      const username = localStorage.getItem("username");

      if (firstName && lastName) {
        setUser({ firstName, lastName });
      } else if (username) {
        setUser({ firstName: username, lastName: "" }); // Ako nema imena, prikazuje username
      } else {
        setUser(null); // Ako nema podataka, postavi user na null
      }
    };

    updateUser();

    // 📌 Dodaj event listener da osveži Header kada se promeni localStorage
    window.addEventListener("storage", updateUser);

    // 📌 Dodaj event listener da se korisnik izloguje kada zatvori tab ili osveži stranicu
    const handleUnload = () => {
      localStorage.clear();
      setUser(null);
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // 📌 Logout funkcija
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Flight Booking</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/airlines">Airlines</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    {user.firstName?.trim() || user.lastName?.trim() ? 
                      `${user.firstName} ${user.lastName}`.trim() : user.firstName || "Profile"}
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;