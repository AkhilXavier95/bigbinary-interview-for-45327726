import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import ModalComponent from "components/Modal";
import arrow from "assets/arrow.png";
import calendar from "assets/calendar.png";

import "react-datepicker/dist/react-datepicker.css";

const defaultRanges = [
  "Past week",
  "Past month",
  "Past 3 months",
  "Past 6 months",
  "Past year",
  "Past 2 years",
];

const Wrapper = styled.div`
  .custom-range-picker {
    border-right: 1px solid #e4e4e7;
  }

  & .react-datepicker {
    border: 0;
  }

  & .react-datepicker__header {
    background: transparent;
    border: 0;
  }

  & .react-datepicker__day-names {
    border-top: 1px solid #e4e4e7;
    font-size: 14px;
    margin-top: 5px;
  }

  & .react-datepicker__month-container {
    margin: 0px 5px;
  }

  & .react-datepicker__day--keyboard-selected {
    background-color: #e9ecef;
    color: #000;
  }

  &. react-datepicker__day--in-selecting {
    background: red;
  }
`;

const DateFilter = () => {
  const [selected, setSelected] = useState("Last 6 Months");
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const modalBody = () => (
    <Wrapper>
      <div className="d-flex m-2 custom-date-picker">
        <div className="mr-4 pr-4 custom-range-picker">
          <ul>
            {defaultRanges.map((el) => (
              <li key={el}>{el}</li>
            ))}
          </ul>
        </div>
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          monthsShown={2}
          selectsRange
          inline
          onChange={onChange}
        />
      </div>
    </Wrapper>
  );

  return (
    <>
      <div
        className="d-flex align-items-center mb-2 pointer"
        onClick={() => setShowModal(true)}
      >
        <img className="mr-2 " src={calendar} alt=""></img>
        <span className="mr-2 font-weight-bold">{selected}</span>
        <img src={arrow} alt=""></img>
      </div>
      <ModalComponent
        className="date-filter"
        show={showModal}
        onHide={() => setShowModal(false)}
        modalBody={modalBody()}
      />
    </>
  );
};

export default DateFilter;
