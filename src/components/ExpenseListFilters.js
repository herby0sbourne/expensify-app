import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => {
      return {
        calendarFocused,
      };
    });
  };

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e) => {
    console.log(e.target.value);
    e.target.value === 'date'
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };

  render() {
    return (
      <div className="container">
        <div className="input-group">
          {/*  */}
          <div className="input-group__item">
            <input
              placeholder="Search Expenses"
              className="text-input"
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>

          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              isOutsideRange={() => false}
              numberOfMonths={1}
            />
          </div>
          {/*  */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTextFilter: (test) => dispatch(setTextFilter(test)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
