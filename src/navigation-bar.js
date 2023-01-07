import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import logo from "./commons/images/title.png";
import useUser from "./commons/services/useUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCookies } from "react-cookie";
import * as API_USERS from "./commons/general_api/notification-api";

import { HOST } from "./commons/hosts";
import SockJsClient from "react-stomp";
import Swal from "sweetalert2";

function NavigationBar() {
  const user = useUser();
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
  const history = useHistory();
  const [updateNotification, setUpdateNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [sockReadMessage, setSockReadMessage] = useState(null);

  const onLogOut = () => {
    console.log(cookies.access_token);
    removeCookies("access_token", { path: "/" });
    history.push("/login");
    window.location.reload(false);
  };

  ///////////////////////////////////////////WEB SOCKET///////////////////////////////////////////
  let onConnected = () => {
    setUpdateNotification(!updateNotification);
  };

  let onMessageReceived = (notification) => {
    let newNotification = notifications;
    newNotification.push(notification);
    setUnread(true);
    setNotifications(newNotification);
    Swal.fire("Warning", notification.description, "warning");
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //// NOTIFICATION
  useEffect(
    () => {
      fetchNotification();
    },
    [updateNotification]
  );
  function fetchNotification() {
    if (cookies.access_token !== null && cookies.access_token !== undefined)
      return API_USERS.getNotification(
        cookies.access_token,
        (result, status, err) => {
          if (result !== null && status === 200) {
            setNotifications(result);
          } else {
            console.log("Could not extract notification from database");
          }
        }
      );
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUnread(false);
  };
  const handleShow = () => setShow(true);
  const [unread, setUnread] = useState(false);
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleReadMessage = (msg) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your message has been read by admin",
      showConfirmButton: false,
      timer: 3500,
    }).then(() => {
      window.location.reload(false);
    });
  };
  return (
    <div>
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
              {user !== null && (
                <Nav.Item>
                  <Nav.Link href="/chat">Chat</Nav.Link>
                </Nav.Item>
              )}
              {user !== null && (
                <Nav.Item>
                  <Nav.Link href="/common-chat">Group-chat</Nav.Link>
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
                  <Button variant="dark" onClick={handleShow}>
                    {unread === false && <NotificationsIcon color="primary" />}
                    {unread === true && (
                      <NotificationImportantIcon style={{ color: "red" }} />
                    )}
                  </Button>
                </Nav.Item>
              )}

              {user !== null && (
                <Nav.Item>
                  <Button
                    variant="secondary"
                    onClick={onLogOut}
                    style={{ marginRight: "20px", marginLeft: "10px" }}
                  >
                    Log out
                  </Button>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Navbar>

      {user !== null && (
        <SockJsClient
          url={HOST.webSocketApi}
          topics={["/queue/alert." + user.id]}
          onConnect={onConnected}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
        />
      )}

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
        scrollable
      >
        <Modal.Header closeButton style={{ backgroundColor: "#939597" }}>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#EDF1FF" }}>
          {notifications.map((notification, index) => (
            <Card style={{ marginBottom: "20px" }}>
              <Card.Header>Max hourly consumption exceeded</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{notification.description}</p>
                </blockquote>
              </Card.Body>
            </Card>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Show More
          </Button>
        </Modal.Footer>
      </Modal>

      {user !== null && (
        <SockJsClient
          url={HOST.webSocketApi}
          topics={["/topic/" + user.id + "/readMessages"]}
          onConnect={() => {}}
          onMessage={(msg) => {
            handleReadMessage(msg);
          }}
          debug={false}
          ref={(client) => {
            {
              setSockReadMessage(client);
            }
          }}
        />
      )}
    </div>
  );
}

export default NavigationBar;
