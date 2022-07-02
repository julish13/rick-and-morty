const filterFields = [
  { name: 'page', type: 'page', initialValue: '1' },
  { name: 'name', type: 'input', initialValue: '' },
  { name: 'species', type: 'input', initialValue: '' },
  { name: 'type', type: 'input', initialValue: '' },
  {
    name: 'status',
    type: 'select',
    initialValue: '',
    values: ['alive', 'dead', 'unknown', 'any'],
  },
  {
    name: 'gender',
    type: 'select',
    initialValue: '',
    values: ['female', 'male', 'genderless', 'unknown', 'any'],
  },
];

export default filterFields;
