import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Typography } from '@mui/material';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Container
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        padding: '24px',
        backgroundColor: 'background.primary',
      }}
    >
      <Typography align="center" variant="h1" component="h1" gutterBottom>
        <StyledLink to="/">{t('title')}</StyledLink>
      </Typography>
      {children}
    </Container>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&:hover, &:active, &:focus': {
    color: theme.palette.text.secondary,
  },
}));

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
