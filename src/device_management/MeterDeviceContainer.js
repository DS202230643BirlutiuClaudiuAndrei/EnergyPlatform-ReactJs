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
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import DeviceEditForm from "./components/DeviceEdit";
import DeviceAddForm from "./components/DeviceAddForm";

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

  //for modals
  const [currentDevice, setCurrentDevice] = useState(null);
  const [currentOwnerDevice, setCurrentOwnerDevice] = useState(null);

  //edit modal
  const [isEditSelected, setEditSelected] = useState(false);
  const [isAddSelected, setAddSelected] = useState(false);
  //set a hook eith the all posible owners
  const [owners, setOwners] = useState([]);
  // use effect for device pagination
  useEffect(
    () => {
      fetchDevices();
    },
    [page]
  );
  useEffect(() => {
    // adding event listeners on mount here
    fetchPossibleOwners();
  }, []);

  //////////////////////////////////////////////////////////////API call functions/////////////////////////////////////////////////////////////
  function fetchDevices() {
    return API_DEVICE.getDevices(
      cookies.access_token,
      getRequestParams(),
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

  function fetchPossibleOwners() {
    return API_DEVICE.getPossibleOwners(
      cookies.access_token,
      (result, status, err) => {
        if (result !== null && status === 200) {
          setOwners((owners) => result);
        } else {
          setError((error) => ({ status: status, errorMessage: err }));
        }
      }
    );
  }

  function deleteDevice(toDeleteDevice) {
    let params = {};
    params["deviceId"] = toDeleteDevice.id;
    return API_DEVICE.deteleDevice(
      cookies.access_token,
      params,
      (result, status, err) => {
        if (result !== null && (status === 200 || status === 204)) {
          Swal.fire(
            toDeleteDevice.description.firstName,
            "Deleted successfully",
            "success"
          );
          fetchDevices();
        } else {
          setError((error) => ({ status: status, errorMessage: err }));
        }
      }
    );
  }

  /////////////////////////////////////////////////////////////for modals /////////////////////////////////////////////
  function toggleEditModal(device, owner) {
    setCurrentDevice(device);
    setCurrentOwnerDevice(owner);
    setEditSelected((isEditSelected) => !isEditSelected);
  }
  function toggleAddModal() {
    setAddSelected((isAddSelected) => !isAddSelected);
  }

  function reload() {
    setIsLoaded((isLoaded) => false);
    setEditSelected(false);
    setAddSelected(false);
    fetchDevices();
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
              METERING DEVICE MANAGENT
            </Card.Header>
            <Card.Body>
              <Card.Text>These are our smart energy metering devices</Card.Text>
              <Button variant="primary" onClick={toggleAddModal}>
                Add new device
              </Button>
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
            devices.map((info, index) => {
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
                      {info.clientInfoDTO === null && (
                        <Card.Text>
                          <AccountCircleIcon /> None
                        </Card.Text>
                      )}
                      <Button
                        variant="warning"
                        style={{ marginLeft: "6rem", marginRight: "2rem" }}
                        onClick={() =>
                          toggleEditModal(info.device, info.clientInfoDTO)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteDevice(info.device)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>

        <div className="col-2" />
        <Modal isOpen={isAddSelected} toggle={toggleAddModal} size="lg">
          <ModalHeader toggle={toggleAddModal}> Add Device: </ModalHeader>
          <ModalBody>
            <DeviceAddForm owners={owners} reloadHandler={reload} />
          </ModalBody>
        </Modal>

        <Modal isOpen={isEditSelected} toggle={toggleEditModal} size="lg">
          <ModalHeader toggle={toggleEditModal}> Edit Device: </ModalHeader>
          <ModalBody>
            <DeviceEditForm
              device={currentDevice}
              owners={owners}
              currentOwner={currentOwnerDevice}
              reloadHandler={reload}
            />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default MeterDeviceContainer;
