import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseFrom from '../../components/ExpenseForm';
import expensesData from '../fixtures/expensesTestData';

test('should return ExpenseFrom correctly', () => {
  const wrapper = shallow(<ExpenseFrom />);

  expect(wrapper).toMatchSnapshot();
});

test('should return ExpenseFrom with expense data', () => {
  const wrapper = shallow(<ExpenseFrom expense={expensesData[1]} />);

  expect(wrapper).toMatchSnapshot();
});

test('should return error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseFrom />);

  expect(wrapper).toMatchSnapshot();

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
  // expect(wrapper.state('error')).not.toBe('');
});

test('should set description on input change', () => {
  const value = 'new description';

  const wrapper = shallow(<ExpenseFrom />);

  wrapper.find('input').at(0).simulate('change', {
    target: { value },
  });

  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'new note';

  const wrapper = shallow(<ExpenseFrom />);

  wrapper.find('textarea').simulate('change', {
    target: { value },
  });

  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.5';

  const wrapper = shallow(<ExpenseFrom />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value },
  });

  expect(wrapper.state('amount')).toBe(value);
});

test('should not amount if invalid input', () => {
  const value = '12.122';

  const wrapper = shallow(<ExpenseFrom />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value },
  });

  expect(wrapper.state('amount')).toBe('');
});

test('should call onsubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();

  const wrapper = shallow(
    <ExpenseFrom expense={expensesData[0]} onSubmit={onSubmitSpy} />
  );

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expensesData[0].description,
    amount: expensesData[0].amount,
    note: expensesData[0].note,
    createdAt: expensesData[0].createdAt,
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseFrom />);

  wrapper.find('SingleDatePicker').prop('onDateChange')(now);

  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseFrom />);

  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });

  expect(wrapper.state('calendarFocused')).toEqual(focused);
});
