import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import "./ExpenseTracker.css";
import { expenseActions } from "../../store/expense-slice";

import {
  fetchExpensesApi,
  addExpenseApi,
  updateExpenseApi,
} from "../../api/expenseApi";

const ExpenseTracker = ({ onTotalExpenseChange }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.expenseStore.items);

  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // FETCH EXPENSES
  useEffect(() => {
    const loadExpenses = async () => {
      const data = await fetchExpensesApi();
      dispatch(expenseActions.setItems(data));
    };

    loadExpenses();
  }, [dispatch]);

  // TOTAL CALCULATION
  const total = items.reduce(
    (sum, item) => sum + Number(item.moneySpent),
    0
  );

  useEffect(() => {
    onTotalExpenseChange?.(total);
  }, [total, onTotalExpenseChange]);

  // ADD / UPDATE EXPENSE
  const submitHandler = async (e) => {
    e.preventDefault();

    const expense = { moneySpent, description, category };

    if (editMode) {
      const updated = await updateExpenseApi({
        ...expense,
        id: editId,
      });

      dispatch(expenseActions.updateItem(updated));
    } else {
      const added = await addExpenseApi(expense);
      dispatch(expenseActions.addItem(added));
    }

    setMoneySpent("");
    setDescription("");
    setCategory("");
    setEditMode(false);
    setEditId(null);
  };

  // EDIT HANDLER
  const editHandler = (expense) => {
    setEditMode(true);
    setEditId(expense.id);
    setMoneySpent(expense.moneySpent);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  return (
    <div className="expense-tracker">
      <h2 className="header">Expense Tracker</h2>

      <form className="expense-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          value={moneySpent}
          onChange={(e) => setMoneySpent(e.target.value)}
          placeholder="Money Spent"
        />

        <input
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>

        <button className="form-button" type="submit">
          {editMode ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <ExpenseList onEdit={editHandler} expenses={items} />
    </div>
  );
};

export default ExpenseTracker;