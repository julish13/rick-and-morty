import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@mui/material';
import { formikInjectedPropsTypes } from '@lib/PropTypes/PropTypesValues';

const Select = ({ formik, name, values }) => {
  const { t } = useTranslation();
  return (
    <FormControl>
      <InputLabel id={`${name}Label`}>{t(`searchForm.selects.${name}.label`)}</InputLabel>
      <MuiSelect
        labelId={`${name}Label`}
        id={name}
        label={t(`searchForm.selects.${name}.label`)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...formik.getFieldProps(name)}
      >
        {values.map((value) => (
          <MenuItem value={value} key={`${name}${value}`}>
            {t(`searchForm.selects.${name}.values.${value}`)}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;

Select.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  formik: PropTypes.shape(formikInjectedPropsTypes.isRequired).isRequired,
};
