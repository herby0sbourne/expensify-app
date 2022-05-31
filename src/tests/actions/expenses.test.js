import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from '../../actions/expenses';
import expenses from '../fixtures/expensesTestData';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });

  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => {
      done();
    });
});

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
  const action = addExpense(expenses[0]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0],
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This is better',
    createdAt: 1000,
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      // console.log(actions);
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense with default database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };

  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      // console.log(actions);
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should setup set expense action qbject with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
    done();
  });
});

test('should remove expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id: id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id: id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('should edit expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = {
    description: 'Gummy Bear',
  };

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id: id,
        updates,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val().description).toBe(updates.description);
      done();
    });
});

// test('should setup Add expense action object with default values', () => {
//   const expenseDefault = {
//     description: '',
//     note: '',
//     amount: 0,
//     createdAt: 0,
//   };
//   const action = addExpense();

//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       ...expenseDefault,
//       id: expect.any(String),
//     },
//   });
// });
