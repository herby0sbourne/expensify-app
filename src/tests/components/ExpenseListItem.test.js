import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expensesData from '../fixtures/expensesTestData';

test('should', () => {
  const wrapper = shallow(<ExpenseListItem {...expensesData[2]} />);
  expect(wrapper).toMatchSnapshot();
});
