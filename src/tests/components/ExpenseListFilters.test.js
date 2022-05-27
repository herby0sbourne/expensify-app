import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly ', () => {
  const setTextFilter = jest.fn();
  const sortByDate = jest.fn();
  const sortByAmount = jest.fn();
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();

  const wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt date correctly ', () => {
  const setTextFilter = jest.fn();
  const sortByDate = jest.fn();
  const sortByAmount = jest.fn();
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();

  const wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change ', () => {
  const setTextFilter = jest.fn();
  const sortByDate = jest.fn();
  const sortByAmount = jest.fn();
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();

  const wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );

  const value = 'water';
  wrapper.find('input').simulate('change', {
    target: {
      value,
    },
  });

  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  wrapper.setProps({ filters: altFilters });

  wrapper.find('select').simulate('change', {
    target: {
      value: 'date',
    },
  });

  expect(sortByDate).toHaveBeenLastCalledWith();
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: {
      value,
    },
  });

  expect(sortByAmount).toHaveBeenLastCalledWith();
});

test('should handle date change', () => {
  const startDate = moment(0).add(1, 'days');
  const endDate = moment(0).add(4, 'days');

  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });

  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date change', () => {
  const calendarFocused = 'endDate';

  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
