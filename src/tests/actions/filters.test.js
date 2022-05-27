import moment from 'moment';
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from '../../actions/filters';

test('should generate set Start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

test('should generate set End date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0),
  });
});

test('should set action object filter value', () => {
  const action = setTextFilter('apple');

  expect(action).toEqual({
    type: 'FILTER_BY',
    text: 'apple',
  });
});

test('should set action object filter default value', () => {
  const action = setTextFilter();

  expect(action).toEqual({
    type: 'FILTER_BY',
    text: '',
  });
});

test('should filter expense by Amount', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT',
  });
});

test('should filter expense by Date', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  });
});
