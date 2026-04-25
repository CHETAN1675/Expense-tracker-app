import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import { deleteExpenseApi } from "../../api/expenseApi";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, onEdit }) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await deleteExpenseApi(id);
    dispatch(expenseActions.removeItem(id));
  };

  return (
    <div>
      <h3 className="expenses-header">Expenses</h3>

      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses found</p>
      ) : (
        <ul className="expenses-list">
          {expenses.map((exp) => (
            <li key={exp.id} className="expense-item">
              <div>
                <div className="expense-field">
                  {exp.description}
                </div>
                <div className="expense-field">
                  ₹ {exp.moneySpent}
                </div>
              </div>

              <div className="btn">
                <button onClick={() => deleteHandler(exp.id)}>
                  Delete
                </button>

                <button onClick={() => onEdit(exp)}>
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;