import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expensesFilter';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount <= 1 ? 'expense' : 'expenses';
  expensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
  // console.log(expenseCount, expensesTotal);
  return (
    <div className="page-header">
      <div className="container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} total:{' '}
          <span>{expensesTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="btn" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
