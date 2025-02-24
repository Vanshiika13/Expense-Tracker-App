import React, { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!title || !amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid title and amount.");
      return;
    }

    // Create new expense object
    const newExpense = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      amount: parseFloat(amount),
      category,
    };

    // Add the expense to the list
    addExpense(newExpense);

    // Clear form fields
    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
