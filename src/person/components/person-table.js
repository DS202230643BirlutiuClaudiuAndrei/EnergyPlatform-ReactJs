import React from "react";

import Table from "../../commons/tables/table";

const columns = [
  {
    Header: "Name",
    accessor: "firstName",
  },
  {
    Header: "Age",
    accessor: "lastName",
  },
];

const filters = [
  {
    accessor: "firstName",
  },
];

function PersonTable(props) {
  return (
    <Table
      data={props.tableData}
      columns={columns}
      search={filters}
      pageSize={5}
    />
  );
}

export default PersonTable;
