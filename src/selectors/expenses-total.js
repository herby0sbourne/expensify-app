const getExpensesTotal = (expenses) => {
  // if (expenses.length === 0) return 0;

  return expenses
    .map((expense) => expense.amount)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);
};

export default getExpensesTotal;
// const getExpensesTotal = (expenses) => {
// if (!expenses)  return 0
//   return expenses.map(expense =>{
//    return expense.amount
//   }).reduce((previousValue, currentValue)=>{
//     return previousValue + currentValue
//   })
// };
