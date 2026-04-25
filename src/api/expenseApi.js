const API =
  "https://expense-tracker-auth-app-default-rtdb.firebaseio.com";

const getUserEmailKey = () => {
  let email = localStorage.getItem("email");
  if (!email) return null;
  return email.replace(/[^a-zA-Z0-9]/g, "");
};

export const fetchExpensesApi = async () => {
  const userEmail = getUserEmailKey();
  if (!userEmail) return [];

  const res = await fetch(`${API}/expenses/${userEmail}.json`);
  if (!res.ok) throw new Error("Failed to fetch expenses");

  const data = await res.json();

  if (!data) return [];

  return Object.keys(data).map((id) => ({
    id,
    ...data[id],
  }));
};

export const addExpenseApi = async (expense) => {
  const userEmail = getUserEmailKey();

  const res = await fetch(`${API}/expenses/${userEmail}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  if (!res.ok) throw new Error("Failed to add expense");

  const data = await res.json();
  return { ...expense, id: data.name };
};

export const updateExpenseApi = async (expense) => {
  const userEmail = getUserEmailKey();

  const res = await fetch(
    `${API}/expenses/${userEmail}/${expense.id}.json`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    }
  );

  if (!res.ok) throw new Error("Failed to update expense");

  return expense;
};

export const deleteExpenseApi = async (id) => {
  const userEmail = getUserEmailKey();

  const res = await fetch(
    `${API}/expenses/${userEmail}/${id}.json`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete expense");

  return id;
};