import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import logo from "../images/logo.png";

const NavBar = () => {
  return (
    <Container fluid className="nav-style">
      <header className="d-flex justify-content-center align-items-center py-3 gap-2">
        <Link to="/">
          <img className="logo mb-2" src={logo} alt="welcome to movies" />
        </Link>
        <h1 className="pt-2"><Link to="/">أفــــــــــــــــــــــلام</Link></h1>
      </header>
    </Container>
  );
};

export default NavBar;
