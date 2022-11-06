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
      <Nav className="container-fluid">
        <Nav.Item>
          <Navbar.Brand href="/">
            <img src={logo} width={"50"} height={"35"} alt="Navbar icon" />
          </Navbar.Brand>
        </Nav.Item>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="container-fluid">
            {user !== null && user.role === "ADMIN" && (
              <Nav.Item>
                <Nav.Link href="/person">User Management</Nav.Link>
              </Nav.Item>
            )}
            {user !== null && user.role === "ADMIN" && (
              <Nav.Item>
                <Nav.Link href="/metering-devices">Metering devices</Nav.Link>
              </Nav.Item>
            )}
            {user !== null && user.role === "CLIENT" && (
              <Nav.Item>
                <Nav.Link href="/owned-devices">My metering devices</Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item className="ml-auto">
              <Nav.Link eventKey={2} href="/">
                {user !== null && (
                  <div>
                    <AccountCircleIcon color="success" /> {user.firstName}{" "}
                    {user.lastName}
                  </div>
                )}
              </Nav.Link>
            </Nav.Item>
            {user !== null && (
              <Nav.Item>
                <Button variant="secondary" onClick={onLogOut}>
                  Log out
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
