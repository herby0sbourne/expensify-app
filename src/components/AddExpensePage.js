import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

// const AddExpensePage = (props) => {
//   return (
//     <div>
//       <h1>Add Expense Page</h1>
//       <div>
//         <ExpenseForm
//           onSubmit={(expense) => {
//             // props.dispatch(addExpense(expense));
//             props.onSubmit(expense);
//             props.history.push('/');
//           }}
//         />
//       </div>
//     </div>
//   );
// };

const mapDispatchToProps = (dispatch) => {
  return {
    startAddExpense: (expense) => dispatch(startAddExpense(expense)),
  };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
