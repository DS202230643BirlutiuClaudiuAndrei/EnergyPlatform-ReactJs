import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

import logo from "./commons/images/title.png";

const textStyle = {
  color: "white",
  textDecoration: "none",
};

function NavigationBar() {
  return (
    <div>
      <Navbar collapseOnSelect color="dark" light expand="md" fixed="top">
        <NavbarBrand href="/">
          <img src={logo} width={"50"} height={"35"} alt="Navbar icon" />
        </NavbarBrand>
        <Nav className="me-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle style={textStyle} nav caret>
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink href="/person">Persons</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem nav inNavbar>
            <NavLink href="/person">Persons</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
