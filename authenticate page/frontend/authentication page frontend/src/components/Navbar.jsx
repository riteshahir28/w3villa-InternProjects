import { Link } from "react-router-dom";
import { useAuth } from "../authcontext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link active text-light">Home</Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/Login" className="nav-link active text-light">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Register" className="nav-link active text-light">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/Profile" className="nav-link active text-light">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger ms-3">Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
