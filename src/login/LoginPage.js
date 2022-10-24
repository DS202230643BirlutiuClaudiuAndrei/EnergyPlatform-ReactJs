import React, { useEffect } from "react";

import "../commons/styles/BackgroundStyle.css";
import CarouselAnimation from "../commons/animation/CarouselAnimation";
import LoginForm from "./LoginForm.js";
import Card from "react-bootstrap/Card";

function LoginPage(props) {
  // componentDidMount
  useEffect(() => {}, []);

  return (
    <div className="background" style={{ width: "100%" }}>
      <div className="container" style={{ marginTop: "50px", width: "100%" }}>
        <div className="row" style={{ paddingTop: "100px" }}>
          <div className="col-6">
            <Card className="text-center">
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <LoginForm />
              </Card.Body>

              <Card.Footer className="text-muted">
                {" "}
                © all rights reserved to Birlutiu Claudiu-Andrei
              </Card.Footer>
            </Card>
          </div>
          <div className="col-6" style={{ tetxAlign: "center" }}>
            <CarouselAnimation style={{ paddingLeft: "100px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
