import React from "react";
import Pagination from "react-js-pagination";

import "./Pagination.scss";

const PaginationComponent = ({
  activePage,
  countPerPage,
  totalCount,
  onChange,
}) => {
  return (
    <div className="d-flex justify-content-end pagination">
      <Pagination
        itemClass="page-item"
        linkClass="page-link"
        activePage={activePage}
        itemsCountPerPage={countPerPage}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        onChange={onChange}
        hideFirstLastPages
      />
    </div>
  );
};

export default PaginationComponent;
