import React from "react";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

import Table from "react-bootstrap/Table";

import "./Table.scss";

const TableComponent = ({ tableData }) => {
  const getStatus = (upcoming, launchSuccess) => {
    const status = upcoming ? "upcoming" : launchSuccess ? "success" : "failed";
    return <span className={status}>{status}</span>;
  };

  return (
    <Table className="table-component" hover>
      <thead className="table-header">
        <tr>
          <th>No:</th>
          <th>Launched (UTC)</th>
          <th>Mission</th>
          <th>Orbit</th>
          <th>Launch Status</th>
          <th>Rocket</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {tableData &&
          tableData.map((el, idx) => (
            <tr key={idx}>
              <td>{el.flight_number}</td>
              <td>
                {format(
                  parseISO(el.launch_date_utc),
                  "dd MMMM yyyy 'at' HH:mm"
                )}
              </td>
              <td>{el.mission_name}</td>
              <td>{el.rocket.second_stage.payloads[0].orbit}</td>
              <td>{getStatus(el.upcoming, el.launch_success)}</td>
              <td>{el.rocket.rocket_name}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
