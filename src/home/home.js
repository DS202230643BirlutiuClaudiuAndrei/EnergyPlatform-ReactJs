import React, { useState } from "react";
import { Button, Container, Jumbotron } from "reactstrap";

import "../commons/styles/BackgroundStyle.css";
import CarouselAnimation from "../commons/animation/CarouselAnimation";

const textStyle = { color: "white" };

function Home() {
  return (
    <div>
      <Jumbotron fluid className="background">
        <Container fluid>
          <h1 className="display-3" style={textStyle}>
            Energy Utility Platform
          </h1>
          <p className="lead" style={textStyle}>
            {" "}
            <b>Enabling real time monitoring of smart devices.</b>{" "}
          </p>
          <hr className="my-2" />
          <p style={textStyle}>
            {" "}
            <b>
              With the transition to green and renewable energy, the Energy &
              Utilities industry, whether it is utility of water, district
              heating or power, has many exciting and necessary challenges
              ahead. There are many use cases in the future Energy & Utilities
              industry such as smart and micro-grids, power-to-x, heat pump
              systems, connected building automation systems, intelligent
              district heating, etc. What they all have in common is that they
              rely heavily on live data and often need to integrate with other
              stakeholders' systems.
            </b>{" "}
          </p>
          <p className="lead">
            <Button
              color="primary"
              onClick={() =>
                window.open("http://coned.utcluj.ro/~salomie/DS_Lic/")
              }
            >
              Learn More
            </Button>
          </p>
        </Container>
        <Container fluid>
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <CarouselAnimation style={{ paddingLeft: "100px" }} />
            </div>
            <div className="col-sm-3" />
          </div>
        </Container>
        <div />
      </Jumbotron>
    </div>
  );
}

export default Home;
