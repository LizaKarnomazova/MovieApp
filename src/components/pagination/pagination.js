import React from 'react';
import { Pagination } from 'antd';

import './pagination.css';

const MoviesPagination = ({ getPage, totalPages }) => {
  if (totalPages === 0) return <></>;
  return (
    <Pagination
      defaultCurrent={1}
      onChange={(e) => getPage(e)}
      total={totalPages * 10}
      showSizeChanger={false}
      className="movie-list__pagination"
    />
  );
};
export default MoviesPagination;
