import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expensesTestData';

test('should return 0 if no expenses', () => {
  const total = getExpensesTotal([]);
  expect(total).toBe(0);
});

test('should correctly add up a single expenses', () => {
  const total = getExpensesTotal([expenses[0]]);
  expect(total).toBe(195);
});

test('should correctly add  up multiple expenses', () => {
  const total = getExpensesTotal(expenses);
  expect(total).toBe(114195);
});
