import '../../resources/CSS/Cabecalh.css'
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../resources/img/logo.png";

function Cabecalho() {
  return (
<Navbar className="topo">
  <Container className="menu" fluid>
    <Link to="/" className="aa">
      <Navbar.Brand className="d-flex align-items-center">
        <img
          src={logo}
          width="130"
          height="130"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
    </Link>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Nav>
        <Navbar.Text >
          <Link to="/Home" className="item-menu">
            <span>Home</span>
          </Link>
        </Navbar.Text>
        <Navbar.Text className="ml-auto">
          <Link to="/Perfil" className="item-menu">
            <span>Perfil</span>
          </Link>
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


  );
}

export default Cabecalho;

