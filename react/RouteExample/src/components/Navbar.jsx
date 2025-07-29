import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserName } from "./CreateContaxt";
 

function Navbar(){
    const uName = useContext(UserName);
     
    
    
    return(
        
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
      <div className="container-fluid">
       
        {/* Left Side: Navbar Brand */}
        <a className="navbar-brand" href="#">{uName.loggedUser[0]}</a>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side: Nav Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/new" className="nav-link">New User</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
 

 

    )
}
export default Navbar;