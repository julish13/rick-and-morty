import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ErrorMessage = ({ status }) => {
  const { t, i18n } = useTranslation();
  const text =
    (i18n.exists(`errorMessages.${status}`) && t(`errorMessages.${status}`)) ||
    (i18n.exists(`errorMessages.${status[0]}**`) && t(`errorMessages.${status[0]}**`)) ||
    t(`errorMessages.default`);

  return (
    <Typography sx={{ marginTop: '8px', textAlign: 'center' }} color="text.error">
      {text}
    </Typography>
  );
};

ErrorMessage.propTypes = {
  status: PropTypes.number.isRequired,
};

export default ErrorMessage;
