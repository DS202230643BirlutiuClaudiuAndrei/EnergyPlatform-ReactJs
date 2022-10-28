import React, { useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Button from "react-bootstrap/Button";
import "./css/ClientTable.css";
import Table from "react-bootstrap/Table";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ClientEditForm from "./ClientEdit";
import ClientInformation from "./ClientInformation";
import * as API_USERS from "../api/person-api";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

function PersonTable(props) {
  //set current user to be displayed in modal
  const [currentUser, setCurrentUser] = useState(null);

  //edit modal
  const [isEditSelected, setEditSelected] = useState(false);
  //view modal
  const [isViewSelected, setViewSelected] = useState(false);
  const [cookies] = useCookies(["access_token"]);
  const [error, setError] = useState({ status: 0, errorMessage: null });

  function reloadFunction() {
    props.reloadHandler();
  }

  function toggleEditModal(current) {
    setCurrentUser(current);
    setEditSelected((isEditSelected) => !isEditSelected);
  }

  function toggleViewModal(current) {
    setCurrentUser(current);
    setViewSelected((isViewSelected) => !isViewSelected);
  }

  function deleteUser(user) {
    return API_USERS.deleteUserAccount(
      cookies.access_token,
      { id: user.id },
      (result, status, err) => {
        if (
          result !== null &&
          (status === 200 || status === 201 || status === 204)
        ) {
          console.log("Successfully uodated client");
          Swal.fire(user.firstName, "Deleted successfully", "success");
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

  return (
    <div>
      <Table
        striped
        bordered
        hover
        variant="dark"
        color="primary"
        style={{ opacity: ".9" }}
      >
        <thead>
          <tr>
            <th className="center-client-table">
              <PermIdentityIcon color="primary" />
              Crt
            </th>
            <th className="center-client-table">First Name</th>
            <th className="center-client-table">Last Name</th>
            <th className="center-client-table">Email</th>
            <th className="center-client-table" />
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((person, index) => (
            <tr key={index}>
              <td className="center-client-table">{index + 1}</td>
              <td className="center-client-table">{person.firstName}</td>
              <td className="center-client-table">{person.lastName}</td>
              <td className="center-client-table">{person.email}</td>

              <td className="center-client-table">
                <Button
                  variant="primary"
                  className="btn-space-client"
                  onClick={() => toggleViewModal(person)}
                >
                  View
                </Button>
                <Button
                  variant="secondary"
                  className="btn-space-client"
                  onClick={() => toggleEditModal(person)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteUser(person)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={isEditSelected} toggle={toggleEditModal} size="lg">
        <ModalHeader toggle={toggleEditModal}> Edit Person: </ModalHeader>
        <ModalBody>
          <ClientEditForm user={currentUser} reloadHandler={reloadFunction} />
        </ModalBody>
      </Modal>

      <Modal isOpen={isViewSelected} toggle={toggleViewModal} size="lg">
        <ModalHeader toggle={toggleViewModal}> View Person: </ModalHeader>
        <ModalBody>
          <ClientInformation user={currentUser} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PersonTable;
