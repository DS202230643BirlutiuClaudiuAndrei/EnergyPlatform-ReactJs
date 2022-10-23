import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

function postLogin(endpoint, config, callback) {
  let request = new Request(HOST.backend_api + endpoint, config);
  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

export { postLogin };
