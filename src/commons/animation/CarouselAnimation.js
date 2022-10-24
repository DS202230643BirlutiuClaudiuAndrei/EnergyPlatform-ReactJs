import React from "react";
import Carousel from "react-bootstrap/Carousel";
import FirstIteam from "../images/FirstItem.jpg";
import SecondIteam from "../images/SecondItem.jpg";
import ThirdIteam from "../images/ThirdItem.jpg";
import Card from "react-bootstrap/Card";

function CarouselAnimation(props) {
  return (
    <Carousel fade variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={FirstIteam}
          width="100%"
          height="400px"
          alt="First Item"
        />
        <Carousel.Caption style={{ textAlign: "top" }}>
          <Card
            bg="secondary"
            text={"white"}
            style={{ width: "18rem", height: "5rem", marginLeft: "10rem" }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Text>
                Electricity is really just organized lightning
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={SecondIteam}
          width="800px"
          height="400px"
          alt="Second slide"
        />

        <Carousel.Caption>
          <Card
            bg="secondary"
            text={"white"}
            style={{ width: "18rem", marginLeft: "10rem" }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Text>
                Electricity travels at the speed of light, about 300,000 km per
                second.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ThirdIteam}
          width="800px"
          height="400px"
          alt="Third slide"
        />

        <Carousel.Caption>
          <Card
            bg="secondary"
            text={"white"}
            style={{ width: "18rem" }}
            className="mb-2"
          >
            <Card.Header>Renewable sources</Card.Header>
            <Card.Body>
              <Card.Text>
                Iceland was the first country in the worl to have 100% of its
                electricity grid produced by renewable sources
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselAnimation;
