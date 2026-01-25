import { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import { Link } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
    setError(null);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!isLogin) {
      const confirmPassword = confirmPasswordInputRef.current.value;
      if (password !== confirmPassword) {
        setError("Passwords didn't match");
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    const url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa1oVJ9j-mWsgn2FGPdp4RStUzpBA4kq4"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa1oVJ9j-mWsgn2FGPdp4RStUzpBA4kq4";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Authentication failed");
      }

      const data = await res.json();

      dispatch(
        authActions.login({
          token: data.idToken,
          email: data.email,
        })
      );
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      {isLoggedIn ? (
        <VerifyEmail />
      ) : (
        <div>
          {error && (
            <p style={{ color: "red", textAlign: "start" }}>*{error}</p>
          )}
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>

            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>

            {!isLogin && (
              <div className={classes.control}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  ref={confirmPasswordInputRef}
                />
              </div>
            )}

            {isLogin && (
              <div className={classes.link}>
                <Link to="/forget-password">Forgot Password?</Link>
              </div>
            )}

            <div className={classes.actions}>
              {!isLoading && (
                <button>{isLogin ? "Login" : "Create Account"}</button>
              )}
              {isLoading && <p>Sending request...</p>}
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default AuthForm;
