import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import Card from "react-bootstrap/Card";

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import * as API_USERS from "./api/person-api";
import "../commons/styles/BackgroundStyle.css";
import Pagination from "@material-ui/lab/Pagination";
import { useCookies } from "react-cookie";
import ChatMessageClient from "./components/ChatMessageClient";
import ChatMessageAdmin from "./components/ChatMessageAdmin";

import useUser from "../commons/services/useUser";
import { HOST } from "../commons/hosts";
import { MeetingRoom } from "@mui/icons-material";
import JsonRpcClient from "react-jsonrpc-client";
import CommonMessages from "./components/CommonMessages";

function CommonChat(props) {
  const [cookies] = useCookies(["access_token"]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clients, setClients] = useState([]);
  const user = useUser();
  // Store error status and message in the same object because we don't want
  // to render the component twice (using setError and setErrorStatus)
  // This approach can be used for linked state variables.
  const [error, setError] = useState({ status: 0, errorMessage: null });

  // componentDidMount

  return (
    <div className="Container background">
      <div className="row" style={{ paddingTop: "3rem" }}>
        <div className="col-sm-2" />
        <div className="col-sm-6">
          <Card bg="secondary" key="secondary" text="white" className="mb-3">
            <Card.Header>
              {" "}
              <i>Messages</i>
            </Card.Header>
          </Card>
        </div>
      </div>
      <div className="col-sm-4" />
      <div className="row">
        <div className="col-sm-2" />

        <div className="col-sm-2" />

        <div className="col-sm-6">
          <CommonMessages user={user} token={cookies.access_token} />
        </div>
        <div className="col-sm-2" />
      </div>
    </div>
  );
}

export default CommonChat;
