import { useEffect, useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import PageCountContext from "../contexts/PageCountContext";
import usePage from "../hooks/usePage";

const Pagination = () => {
  const [pageCount] = useContext(PageCountContext);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  usePage(currentPage);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => window.removeEventListener("resize", () => null);
  }, []);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="التالى"
      onPageChange={handlePageClick}
      marginPagesDisplayed={width > 768 ? 2 : 0}
      pageRangeDisplayed={width > 768 ? 2 : 0}
      pageCount={pageCount}
      previousLabel="السابق"
      containerClassName={"pagination justify-content-center p-3"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
