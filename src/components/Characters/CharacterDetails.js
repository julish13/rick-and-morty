import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardHeader, CardMedia, CardContent, Typography, Grid } from '@mui/material';

const descriptionCategories = ['status', 'species', 'gender', 'type', 'origin', 'location'];

const CharacterDetails = ({ character }) => {
  const { t } = useTranslation();
  const { name, image } = character;
  return (
    <Card
      sx={{
        width: { xs: '300px', sm: '550px' },
        backgroundColor: 'background.secondary',
        paddingTop: '16px',
      }}
    >
      <CardHeader title={name} />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        <CardMedia
          component="img"
          sx={{ height: { xs: '150px', sm: '300px' } }}
          image={image}
          alt={name}
        />
        <CardContent sx={{ paddingTop: { sm: 0 } }}>
          <Grid container component="dl" spacing={1} direction="column">
            {descriptionCategories.map((category) => (
              <Grid item key={category}>
                <Typography component="dt" variant="h8" sx={{ fontWeight: 700 }}>
                  {t(`character.features.${category}`)}
                </Typography>
                <Typography component="dd" variant="body2">
                  {character[category] || t(`character.unsetCategory`)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CharacterDetails;

CharacterDetails.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};
