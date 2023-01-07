import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Container } from "react-bootstrap";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const textStyle = {
  color: "white",
  textDecoration: "none",
};

function EnergyFooter() {
  return (
    <Navbar
      className="justify-content-center"
      bg="secondary"
      variant="dark"
      fixed="bottom"
    >
      <Nav.Item>
        <Nav.Link href="https://www.facebook.com/birlutiuclaudiuc/">
          <FacebookIcon />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://www.linkedin.com/in/claudiu-birlutiu-79a407226/">
          <LinkedInIcon />
        </Nav.Link>{" "}
      </Nav.Item>
      <Nav.Item style={{ justifyContent: "center", marginTop: "17px" }}>
        <p style={{ color: "white" }}>
          Copyright © 2022 Birutiu Claudiu-Andrei. All rights reserved
        </p>
      </Nav.Item>
    </Navbar>
  );
}

export default EnergyFooter;
