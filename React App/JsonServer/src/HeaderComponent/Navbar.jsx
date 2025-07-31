import { BrowserRouter ,Link, Route, Routes} from "react-router";
import UserList from "../UserList";
import UserAdd from "../UserAdd";
import DeleteUser from "../DeleteUser";

function Navbar() {
    return (
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                             <Link to="/alluser" className="nav-link active">All User</Link>
                        </li>
                        <li className="nav-item">
                             <Link to="/adduser" className="nav-link active">Add User</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/deleteuser" className="nav-link active">Delet User</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/updateuser" className="nav-link active">Update User</Link>
                        </li>
                         
                    </ul>
                </div>
            </div>
        </nav>
      
         
    )
}
export default Navbar;