import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  get_clients: "/client",
  create_client: "/admin/create-client",
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

function getPersonById(params, callback) {
  let request = new Request(HOST.backend_api + endpoint.person + params.id, {
    method: "GET",
  });

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function postPerson(token, user_account, callback) {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user_account),
  };
  console.log(config);
  let request = new Request(HOST.backend_api + endpoint.create_client, config);

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

export { getPersons, getPersonById, postPerson };
