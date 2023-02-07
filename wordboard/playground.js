import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => {
  return {
    type: 'INCREMENT',
    incrementBy,
  };
};

const decrementCount = ({ decrementBy = 1 } = {}) => {
  return {
    type: 'DECREMENT',
    decrementBy,
  };
};

const resetCount = () => {
  return {
    type: 'RESET',
  };
};

const setCount = ({ count } = {}) => {
  return {
    type: 'SET',
    count,
  };
};

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        // count: state.count + action.incrementBy,
        // count: action.incrementBy,
        count: state.count + action.incrementBy,
      };

    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy,
      };

    case 'RESET':
      return {
        count: 0,
      };

    case 'SET':
      return {
        count: action.count,
      };
    default:
      return state;
  }
});

// store.dispatch({
//   type: 'INCREMENT',
// });

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch(decrementCount({ decrementBy: 2 }));
store.dispatch(decrementCount());

store.dispatch(resetCount());

store.dispatch(setCount({ count: 101 }));

// console.log(store.getState());
