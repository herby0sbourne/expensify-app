import moment from 'moment';

const filters = {
  test: '',
  sortBy: 'date',
  startDate: undefined,
  startEnd: undefined,
};

const altFilters = {
  test: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  startEnd: moment(0).add(3, 'days'),
};

export { filters, altFilters };
