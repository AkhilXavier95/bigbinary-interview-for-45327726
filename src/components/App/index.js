import React, { useEffect, useState } from "react";

import Header from "components/Header";
import TableComponent from "components/Table";
import PaginationComponent from "components/Pagination";
import Api from "api";

import "./App.scss";

function App() {
  const [tableData, setTableData] = useState([]);
  const [tableDataCount, setTableDataCount] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getLaunchData();
  }, []);

  const getLaunchData = async (offSet = 0) => {
    const {
      data,
      status,
      headers: { [`spacex-api-count`]: count },
    } = await Api().get(`/launches?limit=12&offset=${offSet}`);
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
