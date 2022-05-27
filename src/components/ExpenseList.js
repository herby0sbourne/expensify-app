import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expensesFilter';

export const ExpenseList = (props) => {
  return (
    <div>
      {props.expenses.length === 0 ? (
        <p>No Expense</p>
      ) : (
        props.expenses.map((expense) => {
          return <ExpenseListItem key={expense.id} {...expense} />;
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
  };
};

export default connect(mapStateToProps)(ExpenseList);
/* const ConnectedExpenseList = connect((state) => {
  return {
    expenses: state.expenses,
  };
})(ExpenseList);

export default ConnectedExpenseList; */
