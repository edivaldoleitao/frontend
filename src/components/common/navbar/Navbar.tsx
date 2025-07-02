import "./Navbar.css";
import { logo } from "./index.ts";
import { CircleUserRound, Search } from "lucide-react";

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} className="logo"></img>
      <div className="searchBar">
        <Search className="loupe" />
      </div>
      <CircleUserRound className="perfil" />
    </div>
  );
}

export default Navbar;
