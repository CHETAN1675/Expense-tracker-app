import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ForgetPassword from "./components/Auth/ForgetPassword";
import { ExpenseContextProvider } from "./store/ExpenseContext";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkMode = useSelector((state) => state.theme.isDark);

  return (
    <div className={isDarkMode ? "darkTheme" : ""}>
      <ExpenseContextProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Routes>
          </Layout>
        </Router>
      </ExpenseContextProvider>
    </div>
  );
}

export default App;
