import React, { useRef, useState } from "react";

import useOutsideClick from "helper/useOutsideClick";
import Filter from "assets/filter.png";
import arrow from "assets/arrow.png";

import "./Filter.scss";

const FilterComponent = ({ options, selected, setSelected }) => {
  const ref = useRef();
  const [showOptions, setShowOptions] = useState(false);
  useOutsideClick(ref, () => {
    setShowOptions(false);
  });

  return (
    <div className="d-flex align-items-center filter-container mb-2">
      <div
        className="d-flex align-items-center pointer"
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
      >
        <img className="mr-2" src={Filter} alt="" />
        <div className="mr-3 label">{selected}</div>
        <img src={arrow} alt="" />
      </div>
      {showOptions && (
        <div className="select-filter" ref={ref}>
          {options.map((el) => (
            <span
              className={`${el === selected && "selected"}`}
              value={el}
              onClick={() => {
                setSelected(el);
                setShowOptions(false);
              }}
            >
              {el}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
