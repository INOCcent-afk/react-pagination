import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const PaginationComponent = ({
  postsPerPage,
  totalPosts,
  currentPage,
  page,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pageCount = pageNumbers[pageNumbers.length - 1];
  const handleChange = (event, value) => {
    currentPage(value);
  };

  return (
    <nav>
      <Pagination
        count={pageCount}
        onChange={handleChange}
        className="pagination"
        page={page}
      ></Pagination>
    </nav>
  );
};

export default PaginationComponent;
