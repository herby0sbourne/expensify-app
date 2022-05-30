import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expensesData from '../fixtures/expensesTestData';

let startAddExpense, history, wrapper;

beforeEach(() => {
  startAddExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
});

test('should render AddExpensePage correctly', () => {
  // const onSubmit = jest.fn();
  // const history = { push: jest.fn() };

  // const wrapper = shallow(
  //   <AddExpensePage onSubmit={onSubmit} history={history} />
  // );

  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  // const onSubmit = jest.fn();
  // const history = { push: jest.fn() };

  // const wrapper = shallow(
  //   <AddExpensePage onSubmit={onSubmit} history={history} />
  // );

  wrapper.find('ExpenseForm').prop('onSubmit')(expensesData[1]);

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddExpense).toHaveBeenLastCalledWith(expensesData[1]);
});
