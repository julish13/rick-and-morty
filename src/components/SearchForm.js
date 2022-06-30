import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const fields = [
  ['name', 'input'],
  ['species', 'input'],
  ['type', 'input'],
  ['status', 'select', ['alive', 'dead', 'unknown', 'any']],
  ['gender', 'select', ['female', 'male', 'genderless', 'unknown', 'any']],
];

const setInitialValues = (query) => {
  const entries = fields.map(([fieldName, fieldType]) => {
    const paramValue = Object.hasOwn(query, fieldName) && query[fieldName];
    const defaultValue = fieldType === 'input' ? '' : 'any';
    return [fieldName, paramValue || defaultValue];
  });

  const initialValues = Object.fromEntries(entries);
  return initialValues;
};

const normalizeValues = (values) =>
  fields
    .filter(([, type]) => type === 'select')
    .reduce((acc, [name]) => {
      if (values[name] === 'any') {
        return { ...acc, [name]: '' };
      }
      return acc;
    }, values);

const SearchForm = ({ setQuery, query }) => {
  const { t } = useTranslation();
  const initialValues = setInitialValues(query);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const valuesNormalized = normalizeValues(values);
      setQuery(valuesNormalized);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map(([fieldName, fieldType, selectValues]) => {
        if (fieldType === 'input') {
          return (
            <TextField
              key={fieldName}
              id={fieldName}
              label={t(`searchForm.inputs.${fieldName}`)}
              variant="outlined"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formik.getFieldProps(fieldName)}
            />
          );
        }
        return (
          <FormControl key={fieldName}>
            <InputLabel id={`${fieldName}Label`}>
              {t(`searchForm.selects.${fieldName}.label`)}
            </InputLabel>
            <Select
              labelId={`${fieldName}Label`}
              id={fieldName}
              label={t(`searchForm.selects.${fieldName}.label`)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formik.getFieldProps(fieldName)}
            >
              {selectValues.map((value) => (
                <MenuItem value={value} key={`${fieldName}${value}`}>
                  {t(`searchForm.selects.${fieldName}.values.${value}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      })}
      <Button color="primary" variant="contained" type="submit">
        {t(`searchForm.submit`)}
      </Button>
    </form>
  );
};

SearchForm.propTypes = {
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.shape({
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchForm;
