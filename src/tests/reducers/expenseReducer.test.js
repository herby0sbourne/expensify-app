import expensesReducer from '../../reducers/expensesReducer';
import expenses from '../fixtures/expensesTestData';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('should remove expenses by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should NOT remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-4',
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Water bill',
    note: '',
    amount: 200,
    createdAt: 0,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit expense', () => {
  const note = {
    note: 'i just updated',
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      note,
    },
  };

  const state = expensesReducer(expenses, action);

  expect(state[0].note).toBe(note);
});

test('should not edit expense if expense is not found', () => {
  const note = {
    note: 'i just updated',
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-3',
    updates: {
      note,
    },
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[0]],
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0]]);
});
