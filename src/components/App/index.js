import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router";

import Header from "components/Header";
import TableComponent from "components/Table";
import PaginationComponent from "components/Pagination";
import DateFilter from "components/DateFilter";
import FilterComponent from "components/FilterComponent";
import Api from "api";
import {
  getPath,
  filterOptions,
  defaultRanges,
  getValuesFromUrl,
  getUrl,
} from "utils/helper";

import "./App.scss";

function App({ history, match }) {
  const [tableData, setTableData] = useState([]);
  const [tableDataCount, setTableDataCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [selectedDate, setSelectedDate] = useState(defaultRanges[3]);
  const [tableLoading, setTableLoading] = useState(false);

  const getLaunchData = useCallback(
    async (offSet = 0) => {
      const { url, params } = match;
      const { filter, dateFilter, pageOffset } = getValuesFromUrl(
        url,
        params,
        selectedFilter.value,
        selectedDate.value,
        offSet
      );
      setTableLoading(true);
      const path = getPath(filter, dateFilter);
      const res = await Api().get(
        `/launches${path}&limit=12&offset=${pageOffset}`
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
      setTableLoading(false);
    },
    [selectedFilter, selectedDate, match]
  );

  useEffect(() => {
    if (match.url !== "/") {
      const { params } = match;
      setSelectedFilter(
        filterOptions.find((el) =>
          params.filter === "all" ? el.value === "" : el.value === params.filter
        )
      );
      setSelectedDate({
        label: params.dateFilter,
        value: [new Date(params.startDate), new Date(params.endDate)],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActivePage(1);
    getLaunchData();
  }, [getLaunchData, match]);

  const changeUrl = ({ pageNumber, filter, date }) => {
    history.push(
      getUrl({
        filter: filter ? filter : "all",
        pageNumber: pageNumber ? pageNumber : 1,
        date,
      })
    );
  };

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber);
    getLaunchData((pageNumber - 1) * 12);
    changeUrl({
      pageNumber,
      date: selectedDate,
      filter: selectedFilter.value,
    });
  };

  const onselectDateFilter = (selected) => {
    changeUrl({
      date: selected,
      pageNumber: activePage,
      filter: selectedFilter.value,
    });
    setSelectedDate(selected);
  };
  const onselectFilter = (selected) => {
    changeUrl({
      filter: selected.value,
      date: selectedDate,
      pageNumber: activePage,
    });
    setSelectedFilter(selected);
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="mt-5 ml-5 mr-5 mb-0">
          <div className="d-flex justify-content-between align-items-center mr-1 ml-1">
            <DateFilter
              selected={selectedDate}
              setSelected={onselectDateFilter}
              defaultRanges={defaultRanges}
            />
            <FilterComponent
              options={filterOptions}
              selected={selectedFilter}
              setSelected={onselectFilter}
            />
          </div>
          <TableComponent tableData={tableData} loading={tableLoading} />
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

export default withRouter(App);
