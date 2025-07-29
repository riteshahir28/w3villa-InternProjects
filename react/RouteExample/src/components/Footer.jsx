import { useContext } from "react";
import { UserName } from "./CreateContaxt";

function Footer() {
  const user = useContext(UserName);
  return (
    <footer className="bg-dark text-white text-center py-3 fixed-bottom">
      <div className="container">
        <span>{user.loggedUser[0]}  | {user.loggedUser[1]} </span>
      </div>
    </footer>
  );
}

export default Footer;
