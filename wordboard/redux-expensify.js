import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

/* const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
} = {}) => {
  return {
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt,
    },
  };
};

const removeExpense = ({ id }) => {
  return {
    type: 'REMOVE_EXPENSE',
    id,
  };
};

const editExpense = (id, updates) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates,
  };
}; */
// Expenses Reducer
/* const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // return state.concat(action.expense);
      return [...state, action.expense];

    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.id);

    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
}; */
/* 
const setTextFilter = (filterBy = '') => {
  return {
    type: 'FILTER_BY',
    text: filterBy,
  };
};

const sortByAmount = () => {
  return {
    type: 'SORT_BY_AMOUNT',
  };
};
const sortByDate = () => {
  return {
    type: 'SORT_BY_DATE',
  };
};

const setStartDate = (startDate) => {
  return {
    type: 'SET_START_DATE',
    startDate,
  };
};
const setEndDate = (endDate) => {
  return {
    type: 'SET_END_DATE',
    endDate,
  };
};
 */
//* Filters Reducer
/* const filtersReducerDefault = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const filterReducer = (state = filtersReducerDefault, action) => {
  switch (action.type) {
    case 'FILTER_BY':
      return {
        ...state,
        text: action.text,
      };

    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };

    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };

    default:
      return state;
  }
}; */

/* const getVisiableExpenses = (expenses, filters) => {
  const { text, sortBy, startDate, endDate } = filters;
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt > a.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return b.amount > a.amount ? 1 : -1;
      }
    });
};
 */
/* const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer,
  })
); */

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisiableExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 500, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 250, createdAt: -1000 })
);
const expenseThree = store.dispatch(
  addExpense({ description: 'floor', amount: 750, createdAt: 0 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 150 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(1205));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoStore = {
  expenses: [
    {
      id: 'abcd',
      description: 'May Rent',
      note: 'Rember to pay rent this month',
      amount: 54500,
      createdAt: new Date().toISOString(),
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // user can sort by date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
