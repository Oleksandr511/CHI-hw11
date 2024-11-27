import { NextRouter } from "next/router";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginatorPropsI {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
  router: NextRouter;
}

const Pagination: React.FC<PaginatorPropsI> = ({
  page,
  setPage,
  lastPage,
  router,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    console.log("change page", newPage);
    setPage(newPage);
    router.push({
      pathname: "/",
      query: { ...router.query, page: newPage },
    });
  };
  return (
    <MuiPagination page={page} count={lastPage} onChange={handlePageChange} />
  );
};

export default Pagination;
