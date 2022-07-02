import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import { filterFields } from '@const';
import Select from './Select';
import TextInput from './TextInput';

const selectInitialFormValue = 'any';

const formFields = filterFields
  .filter(({ type }) => type !== 'page')
  .map((field) => {
    if (field.type === 'select') {
      return { ...field, initialValue: selectInitialFormValue };
    }
    return field;
  });

const setInitialValues = (query) => {
  const entries = formFields.map(({ name, initialValue, type, values }) => {
    let value;
    if (type === 'select') {
      value =
        (Object.hasOwn(query, name) && values.includes(query[name]) && query[name]) || initialValue;
    }
    if (type === 'input') {
      value = (Object.hasOwn(query, name) && query[name]) || initialValue;
    }
    return [name, value];
  });

  const initialValues = Object.fromEntries(entries);
  return initialValues;
};

const normalizeValues = (values) =>
  formFields
    .filter(({ type }) => type === 'select')
    .reduce((acc, { name }) => {
      if (values[name] === 'any') {
        return { ...acc, [name]: '' };
      }
      return acc;
    }, values);

const SearchForm = ({ setQuery, query, disabled }) => {
  const { t } = useTranslation();
  const initialValues = setInitialValues(query);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const valuesNormalized = normalizeValues(values);
      setQuery(valuesNormalized);
    },
  });

  const resetFilter = () => {
    const values = formFields.reduce(
      (acc, { name, initialValue }) => ({ ...acc, [name]: initialValue }),
      {}
    );
    setQuery(normalizeValues(values));
    formik.resetForm({ values });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" gap={1} sx={{ maxWidth: '300px', marginX: 'auto' }}>
        {formFields.map(({ name, type, values }) => (
          <Grid item key={name}>
            {type === 'input' ? (
              <TextInput name={name} formik={formik} key={name} />
            ) : (
              <Select name={name} values={values} formik={formik} key={name} />
            )}{' '}
          </Grid>
        ))}
        <Button color="success" variant="contained" type="submit" disabled={disabled}>
          {t(`searchForm.submit`)}
        </Button>
        <Button
          color="info"
          variant="contained"
          type="button"
          onClick={resetFilter}
          disabled={disabled}
        >
          {t(`searchForm.reset`)}
        </Button>
      </Grid>
    </form>
  );
};

SearchForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
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
