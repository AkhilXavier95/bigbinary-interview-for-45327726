import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import ModalComponent from "components/Modal";
import arrow from "assets/arrow.png";
import calendar from "assets/calendar.png";
import { defaultRanges } from "utils/helper";

import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.div`
  .custom-date-picker {
    mi-height: 270px;
  }
  .custom-range-picker {
    border-right: 1px solid #e4e4e7;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0px 16px;
  }

  li {
    padding: 7px 0px;
    cursor: pointer;
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
    margin: 0px 20px;
  }

  & .react-datepicker__day--keyboard-selected {
    background-color: #e9ecef;
    color: #000;
  }

  & .react-datepicker__day--in-selecting-range,
  & .react-datepicker__day--in-range {
    background: #e9ecef;
    color: black;
  }
`;

const DateFilter = ({ selected, setSelected }) => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  console.log({ selected });
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end) {
      setShowModal(false);
      setSelected("Custom");
    }
  };

  const modalBody = () => (
    <Wrapper>
      <div className="d-flex m-2 custom-date-picker">
        <div className="mr-4 pr-4 custom-range-picker">
          <ul>
            {defaultRanges.map((el) => (
              <li
                key={el.label}
                onClick={() => {
                  setSelected(el);
                  setShowModal(false);
                }}
              >
                {el.label}
              </li>
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
        <span className="mr-2 font-weight-bold">{selected.label}</span>
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
