import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";


const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;
  const dispatch = useDispatch();

  //redux permium

  const premium = useSelector((state)=>state.auth.isPremium);
  const items = useSelector((state)=>state.expenseStore.items);
  const isDarkMode = useSelector((state)=>state.theme.isDark);

  const toggleDarkModeHandler = ()=>{
    dispatch(themeActions.toggleTheme());
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {premium &&(
            <li>
              <button onClick={toggleDarkModeHandler}>
                {isDarkMode ? "light Mode": "Dark Mode"}
              </button>
              <CSVLink
              data = {items}
              filename={"expense.csv"}
              className={classes.button}>

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