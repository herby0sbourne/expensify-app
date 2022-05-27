import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup Remove expense action object', () => {
  const action = removeExpense({ id: '123' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123',
  });
});

test('should setup EDIT expense action object', () => {
  const action = editExpense('123', { note: 'new note' });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: { note: 'new note' },
  });
});

test('should setup Add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    note: 'Pay rent this month',
    amount: 250,
    createdAt: 1000,
  };

  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

test('should setup Add expense action object with default values', () => {
  const expenseDefault = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };
  const action = addExpense();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseDefault,
      id: expect.any(String),
    },
  });
});
