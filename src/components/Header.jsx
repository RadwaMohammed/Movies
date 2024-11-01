import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <header className="container-fluid d-flex justify-content-center align-items-center py-3 gap-2 main-header">
      <Link to="/">
        <img className="logo mb-2 d-block" src={logo} alt="welcome to movies" />
      </Link>
      <h1 className="pt-2 fs-1">
        <Link to="/" className="text-decoration-none fw-bolder">
          أفــــــــــــــــــــــلام
        </Link>
      </h1>
    </header>
  );
};

export default Header;
