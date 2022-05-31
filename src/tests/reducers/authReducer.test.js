import authReducer from '../../reducers/authReducer';
import expenses from '../fixtures/expensesTestData';

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: '123456789',
  };

  const state = authReducer({}, action);

  expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT',
  };

  const state = authReducer({ uid: 'vvsdvsvs' }, action);

  expect(state).toEqual({});
});
