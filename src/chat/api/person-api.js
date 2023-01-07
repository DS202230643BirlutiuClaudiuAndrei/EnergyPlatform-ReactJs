import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  get_clients: "/client",
};

function getPersons(token, params, callback) {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let request = new Request(
    HOST.backend_api + endpoint.get_clients + "?" + new URLSearchParams(params),
    config
  );
  RestApiClient.performRequest(request, callback);
}

export { getPersons };
