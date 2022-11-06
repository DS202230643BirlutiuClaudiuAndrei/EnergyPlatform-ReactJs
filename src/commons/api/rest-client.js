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
        callback(null, response.status, "Unauthorized");
      } else if (response.status === 403) {
        callback(null, response.status, "Access denied");
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
