import React, { useEffect, useState } from "react";

import Header from "components/Header";
import TableComponent from "components/Table";
import PaginationComponent from "components/Pagination";
import FilterComponent from "components/FilterComponent";
import Api from "api";
import { getPath, filterOptions } from "utils/helper";

import "./App.scss";

function App() {
  const [tableData, setTableData] = useState([]);
  const [tableDataCount, setTableDataCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [selected, setSelected] = useState(filterOptions[0]);

  useEffect(() => {
    setActivePage(1);
    getLaunchData();
  }, [selected]);

  const getLaunchData = async (offSet = 0) => {
    const path = getPath(selected.value);
    const res = await Api().get(
      `/launches${path ? path : "?"}limit=12&offset=${offSet}`
    );
    const {
      data,
      status,
      headers: { [`spacex-api-count`]: count },
    } = res;
    if (status === 200) {
      setTableData(data);
      setTableDataCount(count);
    }
  };

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber);
    getLaunchData((pageNumber - 1) * 12);
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="m-5">
          <div className="d-flex justify-content-end align-items-center">
            <FilterComponent
              options={filterOptions}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <TableComponent tableData={tableData} />
          <PaginationComponent
            activePage={activePage}
            countPerPage={12}
            totalCount={parseInt(tableDataCount)}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
