import React, { useState, useEffect } from "react";

function ClientInformation(props) {
  const [devices, SetDevices] = useState(null);

  useEffect(() => {
    getDevicesUser();
  }, []);

  return API_USERS.getUserDevices(
    cookies.access_token,
    getRequestParams(),
    (result, status, err) => {
      if (result !== null && status === 200) {
        setTableData((tableData) => result.energyUsers);
        setCount(result.totalPages);
        setIsLoaded((isLoaded) => true);
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    }
  );

  return <div />;
}

export default ClientInformation;
