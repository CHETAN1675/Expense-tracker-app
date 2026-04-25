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

  useEffect(() => {
    const loadExpenses = async () => {
      const data = await fetchExpensesApi();
      dispatch(expenseActions.setItems(data));
    };

    loadExpenses();
  }, [dispatch]);

  const total = items.reduce(
    (sum, item) => sum + Number(item.moneySpent),
    0
  );

  useEffect(() => {
    onTotalExpenseChange?.(total);
  }, [total]);

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
  };

  const editHandler = (expense) => {
    setEditMode(true);
    setEditId(expense.id);
    setMoneySpent(expense.moneySpent);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  return (
    <div className="expense-tracker">
      <h2>Expense Tracker</h2>

      <form onSubmit={submitHandler}>
        <input
          value={moneySpent}
          onChange={(e) => setMoneySpent(e.target.value)}
          placeholder="Money Spent"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>

        <button type="submit">
          {editMode ? "Update" : "Add"}
        </button>
      </form>

      <ExpenseList onEdit={editHandler} expenses={items} />
    </div>
  );
};

export default ExpenseTracker;