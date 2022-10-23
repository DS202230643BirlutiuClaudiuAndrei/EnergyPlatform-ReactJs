import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import PersonForm from "./components/person-form";
import * as API_USERS from "./api/person-api";
import PersonTable from "./components/person-table";
import "../commons/styles/BackgroundStyle.css";
import Pagination from "@material-ui/lab/Pagination";

function UserManagemet(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Store error status and message in the same object because we don't want
  // to render the component twice (using setError and setErrorStatus)
  // This approach can be used for linked state variables.
  const [error, setError] = useState({ status: 0, errorMessage: null });

  // componentDidMount
  useEffect(() => {
    fetchPersons();
  }, []);

  function fetchPersons() {
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJmaXJzdE5hbWUiOiJDbGF1ZGl1IiwibGFzdE5hbWUiOiJCaXJsdGl1Iiwic3ViIjoiY2xhdWRpdUB5YWhvby5jb20iLCJpZCI6IjE0MzM5ODk1LWUyMWMtNDhhNy04OWNkLTI5ZmIyMDc3NmFhYyIsImV4cCI6MTY2NjUzNDI0MSwiaWF0IjoxNjY2NTE2MjQxfQ.JB_RTFbNKI6NJpy0n9UbLVYWftKnEB_4RhxsLmdiyvZ9I81rrjCWvd3Efg86v_a89rbEu-FKeUc255EZaU4xfg";
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const endpoint = "/client";
    return API_USERS.getPersons(endpoint, config, (result, status, err) => {
      if (result !== null && status === 200) {
        console.log(result.energyUsers);
        setTableData((tableData) => result.energyUsers);
        setIsLoaded((isLoaded) => true);
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }

  function toggleForm() {
    setIsSelected((isSelected) => !isSelected);
  }

  function reload() {
    setIsLoaded((isLoaded) => false);

    toggleForm();
    fetchPersons();
  }

  const paginationStyle = {
    textAlign: "venter",
    backgroundColor: "unset",
  };

  return (
    <div class="Container" className="background">
      <div class="row">
        <div class="col-sm-2" />
        <div class="col-sm-8">
          <Card
            bg="dark"
            text="dark"
            style={{
              width: "19rem",
              "margin-top": "100px",
              "margin-left": "100px",
            }}
            className="mb-2"
          >
            <CardHeader color="dark">User Management page</CardHeader>
            <CardBody>
              <CardText>
                On this page you can manage the user accounts from your app
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div class="col-sm-2" />
      </div>

      <div class="row">
        <div class="col-sm-2" />
        <div class="col-sm-8">
          <div
            class="row"
            style={{ "margin-top": "20px", "margin-left": "10px" }}
          >
            <div class="col-sm-12">
              <Button color="primary" onClick={toggleForm}>
                Add Person{" "}
              </Button>
            </div>
          </div>
          <div class="row" style={{ "margin-top": "20px" }}>
            <div class="col-sm-12">
              {isLoaded && <PersonTable tableData={tableData} />}
              {error.status > 0 && (
                <APIResponseErrorMessage
                  errorStatus={error.status}
                  error={error.errorMessage}
                />
              )}
            </div>
          </div>
          <div class="col-sm-2" />
        </div>

        <div class="col-sm-2" />
      </div>
      <div class="row">
        <div class="col-sm-2" />
        <div class="col-sm-8" style={{ "text-align": "center" }}>
          <Pagination
            style={paginationStyle}
            //className="my-3"
            count={200}
            page={1}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="primary"
            color="dark"
            //onChange={handlePageChange}
          />
        </div>

        <div class="col-sm-2" />
      </div>

      <Modal isOpen={isSelected} toggle={toggleForm} size="lg">
        <ModalHeader toggle={toggleForm}> Add Person: </ModalHeader>
        <ModalBody>
          <PersonForm reloadHandler={reload} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UserManagemet;
