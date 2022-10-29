import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import * as CLIENT_API from "../api/ClientApi";

import "../../commons/styles/BackgroundStyle.css";
import Pagination from "@material-ui/lab/Pagination";
import { useCookies } from "react-cookie";
import MeterIcon from "../../commons/images/meter.png";
import HomeIcon from "@mui/icons-material/Home";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useUser from "../../commons/services/useUser";
import ConsumptionChart from "../components/ConsumptionCharts";

function ClientDevicesContainer(props) {
  const [devices, setDevices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies] = useCookies(["access_token"]);
  const [isSelected, setIsSelected] = useState(false);

  // Store error status and message in the same object because we don't want
  // to render the component twice (using setError and setErrorStatus)
  // This approach can be used for linked state variables.
  const [error, setError] = useState({ status: 0, errorMessage: null });
  const user = useUser();
  //for pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 6;

  //set the selected device
  const [curentDevice, setCurrentDevice] = useState();
  useEffect(
    () => {
      fetchDevices();
    },
    [page]
  );

  function toggleForm(device) {
    setCurrentDevice(curentDevice);
    setIsSelected((isSelected) => !isSelected);
  }
  function reload() {
    setIsLoaded((isLoaded) => false);
    setIsSelected(false);
    fetchDevices();
  }
  //////////////////////////////////////////////////////////////API call functions/////////////////////////////////////////////////////////////
  function fetchDevices() {
    const params = getRequestParams();
    params["userId"] = user.id;
    return CLIENT_API.getOwnedDevices(
      cookies.access_token,
      params,
      (result, status, err) => {
        if (result !== null && status === 200) {
          setDevices((devices) => result.meteringDevices);
          setCount(result.totalPages);
          setIsLoaded((isLoaded) => true);
        } else {
          setError((error) => ({ status: status, errorMessage: err }));
        }
      }
    );
  }

  ////////////////////////////////////////////////////////////for pagination////////////////////////////////////////////
  const paginationStyle = {
    textAlign: "venter",
    backgroundColor: "unset",
  };

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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
              MY OWNED METERING DEVICE
            </Card.Header>
            <Card.Body>
              <Card.Text>
                These are your smart energy metering devices
              </Card.Text>
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
      <div
        className="row"
        style={{ marginTop: "1rem", justifyContent: "center" }}
      >
        <div className="col-2" />
        <div
          className="col-8"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {devices !== null &&
            devices.length !== 0 &&
            devices.map((device, index) => {
              return (
                <div>
                  <Card
                    bg="secondary"
                    style={{
                      width: "24rem",
                      marginLeft: "2rem",
                      marginBottom: "2rem",
                      height: "30rem",
                      overflow: "auto",
                    }}
                    text="white"
                  >
                    <Card.Img variant="top" src={MeterIcon} height="200rem" />
                    <Card.Body>
                      <Card.Title>{device.description}</Card.Title>

                      <Card.Text>
                        <ElectricBoltIcon color="warning" />
                        {device.maxHourlyConsumption} kW/h
                      </Card.Text>
                      <Card.Text>
                        <HomeIcon />
                        {device.address}
                      </Card.Text>

                      <Card.Footer>
                        <Button
                          variant="success"
                          style={{ marginLeft: "4rem" }}
                          onClick={() => toggleForm(device)}
                        >
                          View consumption
                        </Button>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>

        <div className="col-2" />

        <Modal isOpen={isSelected} toggle={toggleForm} size="lg">
          <ModalHeader toggle={toggleForm}> Consumption: </ModalHeader>
          <ModalBody>
            <ConsumptionChart />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default ClientDevicesContainer;
