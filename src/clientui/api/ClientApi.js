import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  owned_device: "/owneddevice/all",
};

function getOwnedDevices(token, params, callback) {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
  let request = new Request(
    HOST.backend_api +
      endpoint.owned_device +
      "?" +
      new URLSearchParams(params),
    config
  );
  RestApiClient.performRequest(request, callback);
}

export { getOwnedDevices };
