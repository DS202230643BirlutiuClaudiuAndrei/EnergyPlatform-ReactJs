import React, { useState, useEffect } from "react";

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import "../commons/styles/BackgroundStyle.css";
import CarouselAnimation from "./CarouselAnimation";
import LoginForm from "./LoginForm.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function LoginPage(props) {
  // Store error status and message in the same object because we don't want
  // to render the component twice (using setError and setErrorStatus)
  // This approach can be used for linked state variables.
  const [error, setError] = useState({ status: 0, errorMessage: null });

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
