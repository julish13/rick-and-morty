import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { formikInjectedPropsTypes } from '@lib/PropTypes/PropTypesValues';

const TextInput = ({ formik, name }) => {
  const { t } = useTranslation();
  return (
    <TextField
      fullWidth
      key={name}
      id={name}
      label={t(`searchForm.inputs.${name}`)}
      variant="outlined"
      size="small"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...formik.getFieldProps(name)}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.shape(formikInjectedPropsTypes.isRequired).isRequired,
};

export default TextInput;
