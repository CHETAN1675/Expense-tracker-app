import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();

  const passwordHandler = async () => {
    const enteredEmail = emailInputRef.current.value.trim();

    if (!enteredEmail) {
      alert("Please enter an email");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAa1oVJ9j-mWsgn2FGPdp4RStUzpBA4kq4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send reset email");
      }

      alert("Password reset link sent to your email");
      navigate("/auth");
    } catch (err) {
      console.error(err);
      alert("Enter a valid email");
    }
  };

  return (
    <div className="forget-password">
      <div className="control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailInputRef} required />
      </div>
      <button onClick={passwordHandler}>Reset Password</button>
    </div>
  );
};

export default ForgetPassword;
