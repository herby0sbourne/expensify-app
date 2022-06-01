import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// const now = moment();
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
      buttonTitle: props.expense ? 'Edit Expense' : 'Add Expense',
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;

    this.setState(() => {
      return {
        description,
      };
    });
  };

  onNoteChange = (e) => {
    const note = e.target.value;

    this.setState(() => {
      return {
        note,
      };
    });
  };

  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      // console.log(
      //   new Intl.NumberFormat('en-us', {
      //     style: 'currency',
      //     currency: 'USD',
      //   }).format(amount)
      // );
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => {
        return {
          createdAt,
        };
      });
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => {
      return {
        calendarFocused: focused,
      };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      //* set error state equal = Please Provide descritption and amount.
      this.setState(() => ({
        error: 'Please Provide descritption and amount.',
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
      // console.log('Submitted');
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          className="text-input"
          type="text"
          placeholder="Description"
          autoFocus={true}
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />

        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />

        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />

        <textarea
          className="textarea"
          value={this.state.note}
          placeholder="Add a note for your expense (optional)"
          onChange={this.onNoteChange}
        ></textarea>
        <div>
          <button className="btn">{this.state.buttonTitle}</button>
          {/* <button className="btn">Add Expense</button> */}
        </div>
      </form>
    );
  }
}
