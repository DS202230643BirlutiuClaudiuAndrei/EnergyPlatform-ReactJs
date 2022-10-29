import React from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  const onLogOut = () => {
    console.log(cookies.access_token);
    removeCookies("access_token", { path: "/" });
    history.push("/login");
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
          </Nav>
          <Nav style={{ marginLeft: "25rem" }}>
            <Nav.Link eventKey={2} href="/">
              {user !== null && (
                <div>
                  <AccountCircleIcon color="success" /> {user.firstName}{" "}
                  {user.lastName}
                </div>
              )}
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
