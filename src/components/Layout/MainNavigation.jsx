import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { authActions } from "../../store/auth-slice";
import { themeActions } from "../../store/theme-slice";

const MainNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const premium = useSelector((state) => state.auth.isPremium);
  const items = useSelector((state) => state.expenseStore.items);
  const isDarkMode = useSelector((state) => state.theme.isDark);

  const toggleDarkModeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {premium && (
            <li>
              <button onClick={toggleDarkModeHandler}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <CSVLink
                data={items}
                filename={"expense.csv"}
                className={classes.button}
              >
                Export CSV
              </CSVLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
