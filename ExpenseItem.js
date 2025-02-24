import React from "react";

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <div className="expense-item">
      <span>{expense.title}</span>
      <span>₹{expense.amount}</span>
      <span className="category">{expense.category}</span>
      <button onClick={() => onDelete(expense.id)}>❌</button>
    </div>
  );
};

export default ExpenseItem;
