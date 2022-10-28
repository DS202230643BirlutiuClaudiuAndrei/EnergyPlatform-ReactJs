import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label, FormControl } from "reactstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Validate from "../../commons/validators/Validators";
import * as API_USERS from "../api/DeviceApi";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

function DeviceAddForm(props) {
  const formControlsInit = {
    description: {
      value: "",
      placeholder: "Write the description of the device...",
      valid: false,
      touched: false,
      validationRules: {
        isRequired: true,
        minLength: 2,
      },
    },
    address: {
      value: "",
      placeholder: "Device address ...",
      valid: false,
      touched: false,
      validationRules: {
        isRequired: true,
        minLength: 2,
      },
    },

    maxHourlyConsumption: {
      value: "",
      placeholder: "Max hourly consumption... kw/h",
      valid: false,
      touched: false,
      validationRules: {
        isRequired: true,
        minLength: 1,
      },
    },

    owner: {
      value: null,
      valid: true,
      touched: false,
    },
  };

  const [error, setError] = useState({ status: 0, errorMessage: null });
  const [formIsValid, setFormIsValid] = useState(false);
  const [formControls, setFormControls] = useState(formControlsInit);
  const [cookies] = useCookies(["access_token"]);

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    let updatedControls = { ...formControls };

    let updatedFormElement = updatedControls[name];

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = Validate(
      value,
      updatedFormElement.validationRules
    );
    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let updatedFormElementName in updatedControls) {
      formIsValid =
        updatedControls[updatedFormElementName].valid && formIsValid;
    }

    setFormControls((formControls) => updatedControls);
    setFormIsValid((formIsValidPrev) => formIsValid);
  }

  function postDevice(device) {
    return API_USERS.postDevice(
      cookies.access_token,
      device,
      (result, status, err) => {
        if (
          result !== null &&
          (status === 200 || status === 201 || status === 204)
        ) {
          Swal.fire(device.description, "Post device successfully", "success");
          props.reloadHandler();
        } else if (result !== null && status === 409) {
          setError((error) => ({
            status: status,
            errorMessage: result.message,
          }));
        } else {
          setError((error) => ({ status: status, errorMessage: err }));
        }
      }
    );
  }

  function handleSubmit() {
    console.log(formControls.owner.value);
    let device = {
      description: formControls.description.value,
      address: formControls.address.value,
      maxHourlyConsumption: formControls.maxHourlyConsumption.value,
      ownerId:
        formControls.owner.value !== null &&
        formControls.owner.value !== undefined &&
        formControls.owner.value !== "NONE"
          ? formControls.owner.value
          : null,
    };
    postDevice(device);
  }

  return (
    <div>
      <FormGroup id="description">
        <Label for="descriptionField"> Description: </Label>
        <Input
          name="description"
          id="descriptionField"
          placeholder={formControls.description.placeholder}
          onChange={handleChange}
          defaultValue={formControls.description.value}
          touched={formControls.description.touched ? 1 : 0}
          valid={formControls.description.valid}
          required
        />
        {formControls.description.touched &&
          !formControls.description.valid && (
            <div className={"error-message row"}>
              *Description must have at least 2 characters{" "}
            </div>
          )}
      </FormGroup>

      <FormGroup id="address">
        <Label for="addressField"> Address: </Label>
        <Input
          name="address"
          id="addressField"
          placeholder={formControls.address.placeholder}
          onChange={handleChange}
          defaultValue={formControls.address.value}
          touched={formControls.address.touched ? 1 : 0}
          valid={formControls.address.valid}
          required
        />
        {formControls.address.touched && !formControls.address.valid && (
          <div className={"error-message row"}>
            * Adress must have at least 2 characters
          </div>
        )}
      </FormGroup>

      <FormGroup id="maxHourlyConsumption">
        <Label for="maxHourlyConsumptionField"> Max hourly consumption: </Label>
        <Input
          name="maxHourlyConsumption"
          id="maxHourlyConsumptionField"
          placeholder={formControls.maxHourlyConsumption.placeholder}
          onChange={handleChange}
          defaultValue={formControls.maxHourlyConsumption.value}
          touched={formControls.maxHourlyConsumption.touched ? 1 : 0}
          valid={formControls.maxHourlyConsumption.valid}
          required
        />
        {formControls.maxHourlyConsumption.touched &&
          !formControls.maxHourlyConsumption.valid && (
            <div className={"error-message"}>
              {" "}
              * Max Hourly Consumption must have a valid format
            </div>
          )}
      </FormGroup>
      <Form.Group controlId="formBasicSelect">
        <Form.Label>Select an owner for Device</Form.Label>
        <Form.Control
          as="select"
          style={{ maxHeight: "2rem" }}
          name="owner"
          onChange={handleChange}
          defaultValue={null}
        >
          <option value="NONE">None</option>
          {props.owners !== null &&
            props.owners.map((owner, index) => {
              return (
                <option key={index} value={owner.ownerId}>
                  {owner.email}
                </option>
              );
            })}
        </Form.Control>
      </Form.Group>

      <Row>
        <Col sm={{ size: "4", offset: 5 }}>
          <Button
            type={"submit"}
            disabled={!formIsValid}
            onClick={handleSubmit}
          >
            {" "}
            Edit{" "}
          </Button>
        </Col>
      </Row>

      {error.status > 0 && (
        <APIResponseErrorMessage
          errorStatus={error.status}
          error={error.errorMessage}
        />
      )}
    </div>
  );
}

export default DeviceAddForm;
