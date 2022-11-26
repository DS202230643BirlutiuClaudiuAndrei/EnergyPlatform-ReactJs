import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  notification: "/notification",
};

function getNotification(token, callback) {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let request = new Request(HOST.backend_api + endpoint.notification, config);
  RestApiClient.performRequest(request, callback);
}

export { getNotification };
