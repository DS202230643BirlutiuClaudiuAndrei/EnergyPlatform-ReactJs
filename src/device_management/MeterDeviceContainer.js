import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import * as API_DEVICE from "./api/DeviceApi";

import "../commons/styles/BackgroundStyle.css";
import Pagination from "@material-ui/lab/Pagination";
import { useCookies } from "react-cookie";
import MeterIcon from "../commons/images/meter.png";
import HomeIcon from "@mui/icons-material/Home";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
function MeterDeviceContainer(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [devices, setDevices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies] = useCookies(["access_token"]);
  // Store error status and message in the same object because we don't want
  // to render the component twice (using setError and setErrorStatus)
  // This approach can be used for linked state variables.
  const [error, setError] = useState({ status: 0, errorMessage: null });

  //for pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 6;

  // componentDidMount
  useEffect(
    () => {
      fetchDevices();
    },
    [page]
  );

  function fetchDevices() {
    return API_DEVICE.getDevices(
      cookies.access_token,
      getRequestParams(),
      (result, status, err) => {
        if (result !== null && status === 200) {
          setDevices((devices) => result.meteringDevices);
          console.log(result);
          setCount(result.totalPages);
          setIsLoaded((isLoaded) => true);
        } else {
          setError((error) => ({ status: status, errorMessage: err }));
        }
      }
    );
  }

  function toggleForm() {
    setIsSelected((isSelected) => !isSelected);
  }

  function reload() {
    setIsLoaded((isLoaded) => false);
    setIsSelected(false);
    fetchDevices();
  }

  const paginationStyle = {
    textAlign: "venter",
    backgroundColor: "unset",
  };

  //////for pagination
  const getRequestParams = () => {
    let params = {};
    if (page) {
      params["pageNumber"] = page - 1;
    }
    if (pageSize) {
      params["pageSize"] = pageSize;
    }
    return params;
  };

  const handlePageChange = (event, value) => {
    if (value !== page) setPage(value);
  };
  return (
    <div className="Container background">
      <div className="row">
        <div className="col-2" />
        <div className="col-8">
          <Card
            className="text-center"
            bg="light"
            style={{ marginTop: "4rem", opacity: ".75" }}
          >
            <Card.Header style={{ opacity: ".8" }}>
              METERING DEVICE MANAGENT
            </Card.Header>
            <Card.Body>
              <Card.Text>These are our smart energy metering devices</Card.Text>
              <Button variant="primary">Add new device</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-2" />
      </div>

      <div className="row" style={{ marginTop: "1rem" }}>
        <div className="col-2" />
        <div className="col-8">
          <Pagination
            style={paginationStyle}
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            shape="round"
            color="secondary"
            onChange={handlePageChange}
          />
        </div>
        <div className="col-2" />
      </div>
      <div className="row" style={{ marginTop: "1rem" }}>
        <div className="col-2" />
        <div
          className="col-8"
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {devices !== null &&
            devices.length !== 0 &&
            devices.map((info, index) => {
              return (
                <div>
                  <Card
                    bg="secondary"
                    style={{
                      width: "20rem",
                      marginLeft: "7rem",
                      marginBottom: "1rem",
                    }}
                    text="white"
                  >
                    <Card.Img variant="top" src={MeterIcon} height="200rem" />
                    <Card.Body>
                      <Card.Title>{info.device.description}</Card.Title>

                      <Card.Text>
                        <ElectricBoltIcon color="warning" />
                        {info.device.maxHourlyConsumption} kW/h
                      </Card.Text>
                      <Card.Text>
                        <HomeIcon />
                        {info.device.address}
                      </Card.Text>
                      {info.clientInfoDTO !== null && (
                        <Card.Text>
                          <AccountCircleIcon />
                          {info.clientInfoDTO.email}{" "}
                        </Card.Text>
                      )}
                      <Button
                        variant="warning"
                        style={{ marginLeft: "4rem", marginRight: "2rem" }}
                      >
                        Edit
                      </Button>
                      <Button variant="danger">Delete</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>

        <div className="col-2" />
      </div>
    </div>
  );
}

export default MeterDeviceContainer;
