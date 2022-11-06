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
  const pageSize = 7;

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

    setIsSelected(false);
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
    <div className="Container background">
      <div className="row">
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <Card
            bg="secondary"
            key="secondary"
            text="white"
            style={{ width: "32rem", marginTop: "7rem" }}
            className="mb-3"
          >
            <Card.Header>
              {" "}
              <i>USER MANAGEMENT</i>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                On this page you can manage the user accounts from your app
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-2" />
      </div>

      <div className="row">
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <div
            className="row"
            style={{ marginTop: "20px", marginLeft: "10px" }}
          >
            <div className="col-sm-12">
              <Button color="primary" onClick={toggleForm}>
                Add Person{" "}
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-8">
              <Pagination
                style={paginationStyle}
                //className="my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="round"
                color="secondary"
                onChange={handlePageChange}
              />
            </div>

            <div className="col-sm-2" />
          </div>

          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-sm-12">
              {isLoaded && (
                <PersonTable tableData={tableData} reloadHandler={reload} />
              )}

              {error.status > 0 && (
                <APIResponseErrorMessage
                  errorStatus={error.status}
                  error={error.errorMessage}
                />
              )}
            </div>
          </div>
          <div className="col-sm-2" />
        </div>

        <div className="col-sm-2" />
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
