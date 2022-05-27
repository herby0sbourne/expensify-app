import filterReducer from '../../reducers/filtersReducer';
import moment from 'moment';

test('should setup default filter values', () => {
  const state = filterReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

test('should set sortByAmount to amount', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });

  expect(state.sortBy).toBe('amount');
});

test('should set sortByDay to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filterReducer(currentState, action);

  expect(state.sortBy).toBe('date');
});

test('should set test filter', () => {
  const text = 'rent';

  const action = { type: 'FILTER_BY', text };
  const state = filterReducer(undefined, action);

  expect(state.text).toBe('rent');
});

test('should set StartDate filter', () => {
  const startDate = moment();

  const action = { type: 'SET_START_DATE', startDate };
  const state = filterReducer(undefined, action);

  expect(state.startDate).toEqual(startDate);
});

test('should set endDate filter', () => {
  const endDate = moment();

  const action = { type: 'SET_END_DATE', endDate };
  const state = filterReducer(undefined, action);

  expect(state.endDate).toEqual(endDate);
});
