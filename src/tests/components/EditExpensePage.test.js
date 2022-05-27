import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expensesData from '../fixtures/expensesTestData';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      removeExpense={removeExpense}
      expense={expensesData[0]}
      history={history}
    />
  );
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  // editExpense = jest.fn();
  // removeExpense = jest.fn();
  // history = { push: jest.fn() };
  // wrapper = shallow(
  //   <EditExpensePage
  //     editExpense={editExpense}
  //     removeExpense={removeExpense}
  //     expense={expensesData[0]}
  //     history={history}
  //   />
  // );

  wrapper.find('ExpenseForm').prop('onSubmit')(expensesData[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(
    expensesData[0].id,
    expensesData[0]
  );
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenCalledWith('/');
  expect(removeExpense).toHaveBeenCalledWith({ id: expensesData[0].id });
});
