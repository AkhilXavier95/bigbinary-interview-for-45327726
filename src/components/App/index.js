import React, { useCallback, useEffect, useState } from "react";

import Header from "components/Header";
import TableComponent from "components/Table";
import PaginationComponent from "components/Pagination";
import DateFilter from "components/DateFilter";
import FilterComponent from "components/FilterComponent";
import Api from "api";
import { getPath, filterOptions, defaultRanges } from "utils/helper";

import "./App.scss";

function App() {
  const [tableData, setTableData] = useState([]);
  const [tableDataCount, setTableDataCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [selectedDate, setSelectedDate] = useState(defaultRanges[3]);

  const getLaunchData = useCallback(
    async (offSet = 0) => {
      const path = getPath(selectedFilter.value, selectedDate.value);
      const res = await Api().get(`/launches${path}&limit=12&offset=${offSet}`);
      const {
        data,
        status,
        headers: { [`spacex-api-count`]: count },
      } = res;
      if (status === 200) {
        setTableData(data);
        setTableDataCount(count);
      }
    },
    [selectedFilter, selectedDate]
  );

  useEffect(() => {
    setActivePage(1);
    getLaunchData();
  }, [selectedFilter, selectedDate, getLaunchData]);

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber);
    getLaunchData((pageNumber - 1) * 12);
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="m-5">
          <div className="d-flex justify-content-between align-items-center mr-1 ml-1">
            <DateFilter selected={selectedDate} setSelected={setSelectedDate} />
            <FilterComponent
              options={filterOptions}
              selected={selectedFilter}
              setSelected={setSelectedFilter}
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
