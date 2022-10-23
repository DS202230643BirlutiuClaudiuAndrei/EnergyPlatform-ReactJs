import React, { useState, useEffect } from "react";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import Button from "react-bootstrap/Button";

import Validate from "./validators/Validator.js";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import * as API_USERS from "./api/LoginApi";
//for cookies
import { useCookies } from "react-cookie";
import parseJwt from "../commons/services/ParseJwtToken.js";

const formControlsInit = {
  email: {
    value: "",
    placeholder: "Email...",
    valid: false,
    touched: false,
    validationRules: {
      emailValidator: true,
      isRequired: true,
    },
  },
  password: {
    value: "",
    placeholder: "Password...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: 5,
    },
  },
};

function LoginForm(props) {
  const [error, setError] = useState({ status: 0, errorMessage: null });
  const [formIsValid, setFormIsValid] = useState(false);
  const [formControls, setFormControls] = useState(formControlsInit);
  //for login process
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "redirect_to",
  ]);
  const history = useHistory();

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

  function processJwtToken(token) {
    if (token) {
      const { exp } = parseJwt(token);
      const expires = new Date(exp * 1000);
      setCookie("access_token", token, { path: "/", expires });
    }
    console.log(cookies);
    const to = cookies["redirect_to"] != null ? cookies["redirect_to"] : "/";
    removeCookie("redirect_to", { path: "/" });
    console.log({ to });
    history.push("/");
  }
  function loginUser(loginDto) {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDto),
    };
    const endpoint = "/login";

    return API_USERS.postLogin(endpoint, config, (result, status, err) => {
      if (result !== null && status === 200) {
        processJwtToken(result.token);
        return <Redirect to="/" />;
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }

  function handleSubmit() {
    let loginDto = {
      email: formControls.email.value,
      password: formControls.password.value,
    };
    loginUser(loginDto);
  }

  return (
    <div>
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
        <Label for="passwordField"> Password: </Label>
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
            * Password must have minimum 5 characters
          </div>
        )}
      </FormGroup>

      <Row>
        <Col sm={{ size: "4", offset: 4 }}>
          <Button
            type={"submit"}
            disabled={!formIsValid}
            onClick={handleSubmit}
          >
            {" "}
            Login{" "}
          </Button>
        </Col>
      </Row>
      <Row style={{ "padding-top": "20px" }}>
        <Col sm={{ size: "10", offset: 1 }}>
          <strong> Not registered yet, Register now</strong>
        </Col>
      </Row>
      <Row style={{ "padding-top": "20px" }}>
        <Col sm={{ size: "4", offset: 4 }}>
          <Button type={"submit"} onClick={handleSubmit}>
            {" "}
            Register{" "}
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

export default LoginForm;
