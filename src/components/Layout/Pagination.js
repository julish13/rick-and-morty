/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Pagination as MUIPagination, PaginationItem } from '@mui/material';

const Pagination = ({ pagesQuantity, page, setPage, children }) => {
  const { pathname } = useLocation();
  const paginationElement = (
    <MUIPagination
      count={pagesQuantity}
      page={page}
      onChange={(_, num) => setPage(num)}
      showFirstButton
      showLastButton
      sx={{ marginY: 3, marginX: 'auto' }}
      renderItem={(item) => (
        <PaginationItem component={RouterLink} to={`${pathname}?page=${item.page}`} {...item} />
      )}
    />
  );
  return (
    <StyledPaginatioWrapper>
      {paginationElement}
      {children}
      {paginationElement}
    </StyledPaginatioWrapper>
  );
};

const StyledPaginatioWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

Pagination.propTypes = {
  pagesQuantity: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Pagination;
