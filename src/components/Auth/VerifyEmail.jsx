import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const VerifyEmailHandler = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAa1oVJ9j-mWsgn2FGPdp4RStUzpBA4kq4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send verification email");
      }

      const data = await res.json();
      console.log(data);

      alert("Verification link sent to your email");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="verify-email">
      <button onClick={VerifyEmailHandler}>Verify Email</button>
    </div>
  );
};

export default VerifyEmail;
