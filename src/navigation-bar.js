import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "./commons/images/title.png";
import useUser from "./commons/services/useUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCookies } from "react-cookie";
const textStyle = {
  color: "white",
  textDecoration: "none",
};

function NavigationBar() {
  const user = useUser();
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);

  const onLogOut = () => {
    console.log(cookies.access_token);
    removeCookies("access_token", { path: "/" });
    window.location.reload(false);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} width={"50"} height={"35"} alt="Navbar icon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user !== null && user.role === "ADMIN" && (
              <Nav.Link href="/person">User Management</Nav.Link>
            )}
            {user !== null && user.role === "ADMIN" && (
              <Nav.Link href="/metering-devices">Metering devices</Nav.Link>
            )}
            {user !== null && user.role === "CLIENT" && (
              <Nav.Link href="/owned-devices">My metering devices</Nav.Link>
            )}
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav style={{ marginLeft: "25rem" }}>
            <Nav.Link eventKey={2} href="/">
              <AccountCircleIcon color="success" />{" "}
              {user !== null && user.firstName + " " + user.lastName}
            </Nav.Link>

            {user !== null && (
              <Button variant="secondary" onClick={onLogOut}>
                Log out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
