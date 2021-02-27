import React from "react";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

import Table from "react-bootstrap/Table";
import LoadingComponent from "components/LoadingComponent";

import "./Table.scss";

const TableComponent = ({ tableData, loading }) => {
  const getStatus = (upcoming, launchSuccess) => {
    const status = upcoming ? "upcoming" : launchSuccess ? "success" : "failed";
    return <span className={status}>{status}</span>;
  };

  return (
    <div
      className="table-component position-relative"
      style={{ minHeight: 500 }}
    >
      <Table hover className="mb-0">
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
        {!loading &&
          (tableData && tableData.length > 0 ? (
            <tbody className="table-body">
              {tableData.map((el, idx) => (
                <tr className="table-row" key={idx}>
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
          ) : (
            <div className="position-absolute no-result">
              No result found for the specified filter
            </div>
          ))}
      </Table>
      {loading && (
        <div className="position-absolute loading">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};

export default TableComponent;
