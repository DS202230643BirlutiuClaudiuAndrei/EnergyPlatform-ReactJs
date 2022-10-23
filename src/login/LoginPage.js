import React, { useEffect } from "react";

import "../commons/styles/BackgroundStyle.css";
import CarouselAnimation from "./CarouselAnimation";
import LoginForm from "./LoginForm.js";
import Card from "react-bootstrap/Card";

function LoginPage(props) {
  // componentDidMount
  useEffect(() => {}, []);

  return (
    <div className="background" style={{ width: "100%" }}>
      <div class="container" style={{ "margin-top": "50px", width: "100%" }}>
        <div class="row" style={{ "padding-top": "100px" }}>
          <div class="col-6">
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
          <div class="col-6" style={{ "tetx-align": "center" }}>
            <CarouselAnimation style={{ "padding-left": "100px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
