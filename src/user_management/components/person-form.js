import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import Button from "react-bootstrap/Button";

import Validate from "./validators/person-validators";
import * as API_USERS from "../api/person-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
const formControlsInit = {
  firstName: {
    value: "",
    placeholder: "First Name...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: 2,
    },
  },
  lastName: {
    value: "",
    placeholder: "Last Name...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: 2,
    },
  },

  email: {
    value: "",
    placeholder: "Email...",
    valid: false,
    touched: false,
    validationRules: {
      emailValidator: true,
    },
  },
  password: {
    value: "",
    placeholder: "Password...",
    valid: false,
    touched: false,
    validationRules: {
      minLength: 5,
    },
  },
};

function PersonForm(props) {
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

  function createNewAccount(user_account) {
    return API_USERS.postPerson(
      cookies.access_token,
      user_account,
      (result, status, err) => {
        if (result !== null && (status === 200 || status === 201)) {
          Swal.fire(user_account.firstName, "Inserted successfully", "success");
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
    let user_account = {
      firstName: formControls.firstName.value,
      lastName: formControls.lastName.value,
      email: formControls.email.value,
      password: formControls.password.value,
    };
    createNewAccount(user_account);
  }

  return (
    <div>
      <FormGroup id="firstName">
        <Label for="firstNameField"> First Name: </Label>
        <Input
          name="firstName"
          id="firstNameField"
          placeholder={formControls.firstName.placeholder}
          onChange={handleChange}
          defaultValue={formControls.firstName.value}
          touched={formControls.firstName.touched ? 1 : 0}
          valid={formControls.firstName.valid}
          required
        />
        {formControls.firstName.touched && !formControls.firstName.valid && (
          <div className={"error-message row"}>
            {" "}
            *First Name must have at least 2 characters{" "}
          </div>
        )}
      </FormGroup>

      <FormGroup id="lastName">
        <Label for="lastNameField"> Last Name: </Label>
        <Input
          name="lastName"
          id="lastNameField"
          placeholder={formControls.lastName.placeholder}
          onChange={handleChange}
          defaultValue={formControls.lastName.value}
          touched={formControls.lastName.touched ? 1 : 0}
          valid={formControls.lastName.valid}
          required
        />
        {formControls.lastName.touched && !formControls.lastName.valid && (
          <div className={"error-message row"}>
            {" "}
            * Last Name must have at least 2 characters{" "}
          </div>
        )}
      </FormGroup>

      <FormGroup id="email">
        <Label for="emailField"> Email: </Label>
        <Input
          name="email"
          id="emailField"
          placeholder={formControls.email.placeholder}
          onChange={handleChange}
          defaultValue={formControls.email.value}
          touched={formControls.email.touched ? 1 : 0}
          valid={formControls.email.valid}
          required
        />
        {formControls.email.touched && !formControls.email.valid && (
          <div className={"error-message"}>
            {" "}
            * Email must have a valid format
          </div>
        )}
      </FormGroup>

      <FormGroup id="password">
        <Label for="passwordField"> Email: </Label>
        <Input
          name="password"
          id="passwordField"
          type="password"
          placeholder={formControls.password.placeholder}
          onChange={handleChange}
          defaultValue={formControls.password.value}
          touched={formControls.password.touched ? 1 : 0}
          valid={formControls.password.valid}
          required
        />
        {formControls.password.touched && !formControls.password.valid && (
          <div className={"error-message"}>
            {" "}
            * Password must have a valid format
          </div>
        )}
      </FormGroup>

      <Row>
        <Col sm={{ size: "4", offset: 5 }}>
          <Button
            type={"submit"}
            disabled={!formIsValid}
            onClick={handleSubmit}
          >
            {" "}
            Create{" "}
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

export default PersonForm;
