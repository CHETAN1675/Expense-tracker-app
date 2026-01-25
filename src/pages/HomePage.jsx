import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./HomePage.module.css";
import ExpenseTracker from "../components/ExpenseTracker/ExpenseTracker";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { themeActions } from "../store/theme-slice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalExpense, setTotalExpense] = useState(0);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const isDarkMode = useSelector((state) => state.theme.isDark);

  const profileHandler = () => {
    navigate("/profile");
  };

  const activatePremiumHandler = () => {
    dispatch(authActions.setIsPremium());
    if (!isDarkMode) dispatch(themeActions.toggleTheme()); // enables dark mode automatically
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <section className={classes.starting}>
            <p>Welcome to Expense Tracker</p>
            <div className={classes.profile}>
              <p>Your profile is incomplete</p>
              <button onClick={profileHandler}>Complete Now</button>
            </div>
            {/* Activate Premium Button */}
            {!isPremium && totalExpense >= 10000 && (
              <div className={classes.premium}>
                <p>Congratulations! You are eligible for Premium.</p>
                <button onClick={activatePremiumHandler}>Activate Premium</button>
              </div>
            )}
          </section>
          <ExpenseTracker onTotalExpenseChange={setTotalExpense} />
        </div>
      ) : (
        <h1>Welcome to Expense Tracker!!!</h1>
      )}
    </>
  );
};

export default HomePage;
