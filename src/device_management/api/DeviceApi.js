import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  get_all_devices: "/device/all",
  device: "/device",
  owners: "/possible-owners",
};

function getDevices(token, params, callback) {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let request = new Request(
    HOST.backend_api +
      endpoint.get_all_devices +
      "?" +
      new URLSearchParams(params),
    config
  );
  RestApiClient.performRequest(request, callback);
}

function postDevice(token, device, callback) {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(device),
  };
  console.log(config);
  let request = new Request(HOST.backend_api + endpoint.device, config);

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

function putDevice(token, device, callback) {
  const config = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(device),
  };
  console.log(config);
  let request = new Request(HOST.backend_api + endpoint.device, config);

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

function deteleDevice(token, params, callback) {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let request = new Request(
    HOST.backend_api + endpoint.device + "?" + new URLSearchParams(params),
    config
  );
  RestApiClient.performRequest(request, callback);
}
function getPossibleOwners(token, callback) {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let request = new Request(HOST.backend_api + endpoint.owners, config);
  RestApiClient.performRequest(request, callback);
}

export { getDevices, deteleDevice, putDevice, postDevice, getPossibleOwners };
