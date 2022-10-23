import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import Card from "react-bootstrap/Card";

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import PersonForm from "./components/person-form";
import * as API_USERS from "./api/person-api";
import PersonTable from "./components/person-table";
import "../commons/styles/BackgroundStyle.css";
import Pagination from "@material-ui/lab/Pagination";
import { useCookies } from "react-cookie";

function UserManagemet(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies] = useCookies(["access_token"]);
  // Store error status and message in the same object because we don't want
  // to render the component twice (using setError and setErrorStatus)
  // This approach can be used for linked state variables.
  const [error, setError] = useState({ status: 0, errorMessage: null });

  //for pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 10;

  // componentDidMount
  useEffect(
    () => {
      fetchPersons();
    },
    [page]
  );

  function fetchPersons() {
    return API_USERS.getPersons(
      cookies.access_token,
      getRequestParams(),
      (result, status, err) => {
        if (result !== null && status === 200) {
          setTableData((tableData) => result.energyUsers);
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

    toggleForm();
    fetchPersons();
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
    <div class="Container" className="background">
      <div class="row">
        <div class="col-sm-2" />
        <div class="col-sm-8">
          <Card
            bg="secondary"
            key="secondary"
            text="white"
            style={{ width: "32rem", "margin-top": "7rem" }}
            className="mb-3"
          >
            <Card.Header>User Management page</Card.Header>
            <Card.Body>
              <Card.Text>
                On this page you can manage the user accounts from your app
              </Card.Text>
            </Card.Body>
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
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="primary"
            color="dark"
            onChange={handlePageChange}
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
