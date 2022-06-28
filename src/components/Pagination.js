/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Pagination as MUIPagination, PaginationItem, Stack } from '@mui/material';

const Pagination = ({ pagesQuantity, page, setPage, children }) => {
  const paginationElement = (
    <MUIPagination
      count={pagesQuantity}
      page={page}
      onChange={(_, num) => setPage(num)}
      showFirstButton
      showLastButton
      sx={{ marginY: 3, marginX: 'auto' }}
      renderItem={(item) => (
        <PaginationItem component={RouterLink} to={`/?page=${item.page}`} {...item} />
      )}
    />
  );
  return (
    <Stack spacing={2}>
      {paginationElement}
      {children}
      {paginationElement}
    </Stack>
  );
};

Pagination.propTypes = {
  pagesQuantity: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Pagination;
