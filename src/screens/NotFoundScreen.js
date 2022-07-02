import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@components';

const NotFoundScreen = () => {
  const { t } = useTranslation();
  return (
    <section>
      <ErrorMessage status={404} />
      <Button
        sx={{ margin: '10px auto', display: 'block', width: 'fit-content' }}
        variant="contained"
        component={Link}
        to="/"
      >
        {t('notFound.link')}
      </Button>
    </section>
  );
};

export default NotFoundScreen;
