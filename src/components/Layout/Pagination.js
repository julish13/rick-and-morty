/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';
import { Pagination as MuiPagination, PaginationItem } from '@mui/material';

const Pagination = ({
  pagesQuantity,
  page,
  setPage,
  children,
  maxItemsPerPage,
  itemsQuantity,
  itemsPerPage,
}) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const rangeStart = maxItemsPerPage * (page - 1);
  const rangeEnd = rangeStart + itemsPerPage;

  const paginationElement = (
    <MuiPagination
      count={pagesQuantity}
      page={page}
      onChange={(_, num) => setPage(num)}
      showFirstButton
      showLastButton
      sx={{ marginY: 3, marginX: 'auto' }}
      renderItem={(item) => {
        searchParams.set('page', item.page);
        const paramsString = searchParams.toString();
        return (
          <PaginationItem component={RouterLink} to={`${pathname}?${paramsString}`} {...item} />
        );
      }}
    />
  );
  return (
    <StyledPaginationWrapper>
      {paginationElement}
      <StyledPaginationRange>
        {t('pagination.range', { start: rangeStart, end: rangeEnd, quantity: itemsQuantity })}
      </StyledPaginationRange>
      {children}
      {paginationElement}
    </StyledPaginationWrapper>
  );
};

const StyledPaginationWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

const StyledPaginationRange = styled('p')`
  margin: 0 auto 8px;
`;

Pagination.propTypes = {
  pagesQuantity: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  itemsQuantity: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  maxItemsPerPage: PropTypes.number,
};

Pagination.defaultProps = {
  maxItemsPerPage: 20,
};

export default Pagination;
