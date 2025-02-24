import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css"; // Import CSS

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [filter, setFilter] = useState("All");

  // Load expenses from Local Storage on app start
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (savedExpenses) setExpenses(savedExpenses);
  }, []);

  // Save expenses to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Save Dark Mode state in Local Storage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Function to add new expense
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // Function to delete an expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Function to calculate total expense
  const getTotalExpense = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Function to filter expenses based on category
  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter((expense) => expense.category === filter);

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      
      {/* Dark Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Expense Form */}
      <ExpenseForm addExpense={addExpense} />

      {/* Category Filter */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
      </select>

      {/* Expense List */}
      <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />

      {/* Total Expense */}
      {expenses.length > 0 && <h3>Total Expense: ₹{getTotalExpense()}</h3>}
    </div>
  );
};

export default App;
