import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import { deleteExpenseApi } from "../../api/expenseApi";

const ExpenseList = ({ expenses, onEdit }) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await deleteExpenseApi(id);
    dispatch(expenseActions.removeItem(id));
  };

  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp.id}>
          {exp.description} - {exp.moneySpent}

          <button onClick={() => deleteHandler(exp.id)}>
            Delete
          </button>

          <button onClick={() => onEdit(exp)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;