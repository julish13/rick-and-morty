import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import Select from './Select';
import TextInput from './TextInput';

const fields = [
  { name: 'name', type: 'input', initialValue: '' },
  { name: 'species', type: 'input', initialValue: '' },
  { name: 'type', type: 'input', initialValue: '' },
  {
    name: 'status',
    type: 'select',
    initialValue: 'any',
    values: ['alive', 'dead', 'unknown', 'any'],
  },
  {
    name: 'gender',
    type: 'select',
    initialValue: 'any',
    values: ['female', 'male', 'genderless', 'unknown', 'any'],
  },
];

const setInitialValues = (query) => {
  const entries = fields.map(({ name, initialValue }) => {
    const paramValue = Object.hasOwn(query, name) && query[name];
    return [name, paramValue || initialValue];
  });

  const initialValues = Object.fromEntries(entries);
  return initialValues;
};

const normalizeValues = (values) =>
  fields
    .filter(({ type }) => type === 'select')
    .reduce((acc, { name }) => {
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

  const resetFilter = () => {
    const resetedQuery = fields.reduce(
      (acc, { name, initialValue }) => ({ ...acc, [name]: initialValue }),
      {}
    );
    setQuery(normalizeValues(resetedQuery));
    formik.resetForm();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" gap={1} sx={{ maxWidth: '300px', marginX: 'auto' }}>
        {fields.map(({ name, type, values }) => (
          <Grid item>
            {type === 'input' ? (
              <TextInput name={name} formik={formik} key={name} />
            ) : (
              <Select name={name} values={values} formik={formik} key={name} />
            )}{' '}
          </Grid>
        ))}
        <Button color="success" variant="contained" type="submit">
          {t(`searchForm.submit`)}
        </Button>
        <Button color="info" variant="contained" type="button" onClick={resetFilter}>
          {t(`searchForm.reset`)}
        </Button>
      </Grid>
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
