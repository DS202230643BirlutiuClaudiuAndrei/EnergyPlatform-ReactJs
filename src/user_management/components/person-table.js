import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Button from "react-bootstrap/Button";
import "./css/ClientTable.css";
import Table from "react-bootstrap/Table";

function PersonTable(props) {
  return (
    <div>
      <Table striped bordered hover variant="dark" color="primary">
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
            <tr id={index}>
              <td className="center-client-table">{index + 1}</td>
              <td className="center-client-table">{person.firstName}</td>
              <td className="center-client-table">{person.lastName}</td>
              <td className="center-client-table">{person.email}</td>

              <td className="center-client-table">
                <Button variant="primary" className="btn-space-client">
                  View
                </Button>
                <Button variant="secondary" className="btn-space-client">
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PersonTable;
