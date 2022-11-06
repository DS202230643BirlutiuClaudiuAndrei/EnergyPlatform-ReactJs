import React, { useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledAlert,
} from "reactstrap";

import styles from "../styles/project-style.css";

function APIResponseErrorMessage(props) {
  const [error, setError] = useState(props.error);
  const [errorStatus, setErrorStatus] = useState(props.errorStatus);
  const [collapseForm, setCollapseForm] = useState(false);
  console.log(props);
  function toggleForm() {
    setCollapseForm((collapseForm) => !collapseForm);
  }

  return (
    <div>
      <UncontrolledAlert color="danger">
        Error to execute this action.
        {errorStatus > 0 && (
          <Button color="link" onClick={toggleForm}>
            Details...
          </Button>
        )}
      </UncontrolledAlert>

      {errorStatus > 1 && (
        <Modal
          isOpen={collapseForm}
          toggle={toggleForm}
          className={props.className}
        >
          <ModalHeader toggle={toggleForm} className={styles.errorTitle}>
            {" "}
            Server side error information:{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="3"> Time: </Col>{" "}
              <Col xs="auto" className={styles.errorText}>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(error.timestamp)}
              </Col>
            </Row>
            <Row>
              <Col xs="3"> Message : </Col>{" "}
              <Col xs="auto" className={styles.errorText}>
                {error.message}{" "}
              </Col>
            </Row>

            <Row>
              <Col xs="3"> Details : </Col>{" "}
              <Col xs="auto" className={styles.errorText}>
                {error.details}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="green" onClick={toggleForm}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

export default APIResponseErrorMessage;
