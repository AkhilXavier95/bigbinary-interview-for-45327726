import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router";
import format from "date-fns/format";

import ModalComponent from "components/Modal";
import Header from "components/Header";
import TableComponent from "components/Table";
import PaginationComponent from "components/Pagination";
import DateFilter from "components/DateFilter";
import FilterComponent from "components/FilterComponent";
import { getStatus } from "utils/helper";

import nasaImg from "assets/nasa.png";
import wikiImg from "assets/wiki.png";
import youTubeImg from "assets/youtube.png";

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
  const [showModal, setShowModal] = useState(false);
  const [rowContent, setRowContent] = useState(null);

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
      setActivePage(params.page);
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

  const modalHeader = () => (
    <div className="d-flex">
      <div className="d-flex flex-column">
        <span className="title">{rowContent && rowContent.mission_name}</span>
        <span className="rocket-name">
          {rowContent && rowContent.rocket.rocket_name}
        </span>
        <div className="ml-1 link-button-container">
          <span className="mr-2">
            <a
              href={rowContent && rowContent.links.article_link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={nasaImg} alt="" />
            </a>
          </span>
          <span className="mr-2">
            <a
              href={rowContent && rowContent.links.wikipedia}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={wikiImg} alt="" />
            </a>
          </span>
          <span className="mr-2">
            <a
              href={rowContent && rowContent.links.video_link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={youTubeImg} alt="" />
            </a>
          </span>
        </div>
      </div>
      <span className="ml-3 ">
        {rowContent &&
          getStatus(rowContent.upcoming, rowContent.launch_success)}
      </span>
    </div>
  );

  const modalBody = () => (
    <>
      <div>
        <p className="details">
          {rowContent && rowContent.details}{" "}
          <a
            href={rowContent && rowContent.links.wikipedia}
            target="_blank"
            rel="noreferrer noopener"
          >
            Wikipedia
          </a>
        </p>
      </div>
      <div className="details-item d-flex">
        <span>Flight Number</span>
        <span>{rowContent && rowContent.flight_number}</span>
      </div>
      <div className="details-item d-flex">
        <span>Mission Name</span>
        <span>{rowContent && rowContent.mission_name}</span>
      </div>
      <div className="details-item d-flex">
        <span>Rocket Type</span>
        <span>{rowContent && rowContent.rocket.rocket_type}</span>
      </div>
      <div className="details-item d-flex">
        <span>Rocket Name</span>
        <span>{rowContent && rowContent.rocket.rocket_name}</span>
      </div>
      <div className="details-item d-flex">
        <span>Manufacture</span>
        <span>
          {rowContent &&
            rowContent.rocket.second_stage.payloads
              .map((el) => el.manufacturer)
              .join(", ")}
        </span>
      </div>
      <div className="details-item d-flex">
        <span>Nationality</span>
        <span>
          {rowContent &&
            rowContent.rocket.second_stage.payloads
              .map((el) => el.nationality)
              .join(", ")}
        </span>
      </div>
      <div className="details-item d-flex">
        <span>Launch Date</span>
        <span>
          {rowContent &&
            format(
              new Date(rowContent.launch_date_local),
              "dd MMMM yyyy HH:mm"
            )}
        </span>
      </div>
      <div className="details-item d-flex">
        <span>Payload Type</span>
        <span>
          {rowContent &&
            rowContent.rocket.second_stage.payloads
              .map((el) => el.payload_type)
              .join(", ")}
        </span>
      </div>
      <div className="details-item d-flex">
        <span>Orbit</span>
        <span>
          {rowContent &&
            rowContent.rocket.second_stage.payloads
              .map((el) => el.orbit)
              .join(", ")}
        </span>
      </div>
      <div className="details-item d-flex no-border">
        <span>Launch Site</span>
        <span>{rowContent && rowContent.launch_site.site_name}</span>
      </div>
    </>
  );

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
          <TableComponent
            tableData={tableData}
            loading={tableLoading}
            onRowClick={(item) => {
              setRowContent(item);
              setShowModal(true);
            }}
          />
          <PaginationComponent
            activePage={activePage}
            countPerPage={12}
            totalCount={parseInt(tableDataCount)}
            onChange={onPageChange}
          />
        </div>
      </div>
      <ModalComponent
        className="details-modal"
        show={showModal}
        header={modalHeader()}
        onHide={() => setShowModal(false)}
        modalBody={modalBody()}
      />
    </div>
  );
}

export default withRouter(App);
