import React from "react";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

import Table from "react-bootstrap/Table";
import LoadingComponent from "components/LoadingComponent";
import { getStatus } from "utils/helper";

import "./Table.scss";

const TableComponent = ({ tableData, loading, onRowClick }) => {
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
        <tbody className="table-body">
          {!loading &&
            (tableData && tableData.length > 0 ? (
              <>
                {tableData.map((el, idx) => (
                  <tr
                    key={idx}
                    className="table-row"
                    onClick={() => onRowClick(el)}
                  >
                    <td>{el.flight_number}</td>
                    <td>
                      {format(
                        parseISO(el.launch_date_utc),
                        "dd MMMM yyyy 'at' HH:mm"
                      )}
                    </td>
                    <td>{el.mission_name}</td>
                    <td>
                      {el.rocket.second_stage.payloads
                        .map((el) => el.orbit)
                        .join(", ")}
                    </td>
                    <td>{getStatus(el.upcoming, el.launch_success)}</td>
                    <td>{el.rocket.rocket_name}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="position-absolute no-result">
                <td>No result found for the specified filter</td>
              </tr>
            ))}
        </tbody>
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
