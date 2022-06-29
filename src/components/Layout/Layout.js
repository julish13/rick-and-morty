import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container, Typography } from '@mui/material';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <StyledContainer>
      <Typography align="center" variant="h1" component="h1" gutterBottom>
        {t('title')}
      </Typography>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  minWidth: '100vw',
  padding: '24px',
  backgroundColor: theme.palette.background.primary,
}));

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
