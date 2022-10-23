import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import * as API_USERS from "../api/person-api";
import { useCookies } from "react-cookie";
import HomeIcon from "@mui/icons-material/Home";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
function ClientInformation(props) {
  const [devices, setDevices] = useState(null);
  const [cookies] = useCookies(["access_token"]);
  const [error, setError] = useState({ status: 0, errorMessage: null });

  useEffect(() => {
    getDevicesUser();
  }, []);

  function getDevicesUser() {
    return API_USERS.getMeteringDevices(
      cookies.access_token,
      { id: props.user.id },
      (result, status, err) => {
        if (result !== null && status === 200) {
          setDevices((devices) => result);
        } else {
          setError((error) => ({ status: status, errorMessage: err }));
        }
      }
    );
  }

  return (
    <div>
      <Card border="primary">
        <Card.Header as="h5">
          {props.user.firstName} {props.user.lastName} - {props.user.email}
        </Card.Header>

        <Card.Body>
          <Card.Title>Metering devices</Card.Title>
          {(devices === null || devices.length === 0) && (
            <div>none devices associated</div>
          )}
          {devices !== null &&
            devices.length !== 0 &&
            devices.map((device, index) => {
              return (
                <Card style={{ "margin-top": "1rem" }} border="info">
                  <Card.Header key={device.id} as="h5">
                    {device.description}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <HomeIcon /> {device.address}
                    </Card.Text>
                    <Card.Text>
                      <ElectricBoltIcon />
                      {device.maxHourlyConsumption} kW/ h
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ClientInformation;
