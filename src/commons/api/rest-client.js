function performRequest(request, callback) {
  fetch(request)
    .then(function(response) {
      if (response.ok) {
        if (response.status === 204) {
          callback({ message: "success" }, 204, null);
        } else {
          response.json().then((json) => callback(json, response.status, null));
        }
      } else if (response.status === 401) {
        callback(null, response.status, {
          timeStamp: new Date(),
          message: "Invalid password",
          details: "",
        });
      } else if (response.status === 403) {
        response.json().then((json) => callback(null, response.status, json));
      } else if (response.status === 409) {
        response.json().then((json) => callback(null, response.status, json));
      } else if (response.status === 404) {
        response.json().then((json) => callback(null, response.status, json));
      }
    })
    .catch(function(err) {
      //catch any other unexpected error, and set custom code for error = 1
      callback(null, 1, err);
    });
}

export default {
  performRequest,
};
