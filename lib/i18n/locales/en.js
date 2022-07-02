export default {
  translation: {
    title: 'Rick and Morty Characters',
    character: {
      features: {
        status: 'Status',
        species: 'Species',
        gender: 'Gender',
        origin: 'Origin location',
        location: 'Last known location',
        type: 'Type',
      },
      unsetCategory: 'unset',
    },
    pagination: {
      range: '{{start}} to {{end}} from {{quantity}}',
    },
    searchForm: {
      inputs: {
        name: 'Name',
        species: 'Species',
        type: 'Type',
      },
      selects: {
        status: {
          label: 'Status',
          values: {
            alive: 'Alive',
            dead: 'Dead',
            unknown: 'Unknown',
            any: 'Any',
          },
        },
        gender: {
          label: 'Gender',
          values: {
            female: 'Female',
            male: 'Male',
            genderless: 'Genderless',
            unknown: 'Unknown',
            any: 'Any',
          },
        },
      },
      submit: 'Search',
      reset: 'Reset Filter',
    },
    errorMessages: {
      404: 'Not Found',
      400: 'Bad Request',
      '5**': 'Server Error',
      default: 'Something went wrong',
    },
  },
};
