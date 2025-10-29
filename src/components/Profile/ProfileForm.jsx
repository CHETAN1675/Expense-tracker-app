import { useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const fullNameInputRef = useRef();
  const profileUrlInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!authCtx.token) return; 

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCprTZVW6b9fM51Dp_WL5C-T5yTGXa7t9s`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: authCtx.token }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || "Failed to fetch user data");
        }

        const user = data.users?.[0];
        if (user) {
          fullNameInputRef.current.value = user.displayName || "";
          profileUrlInputRef.current.value = user.photoUrl || "";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [authCtx.token]); 


  const cancelHandler = () => {
    navigate("/");
  };


  const updateProfile = async (event) => {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredPhotoUrl = profileUrlInputRef.current.value;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCprTZVW6b9fM51Dp_WL5C-T5yTGXa7t9s`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: enteredName,
            photoUrl: enteredPhotoUrl,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to update profile");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={updateProfile} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="full-name">Full Name</label>
        <input type="text" id="full-name" ref={fullNameInputRef} required />
      </div>
      <div className={classes.control}>
        <label htmlFor="photo-url">Profile Photo URL</label>
        <input type="text" id="photo-url" ref={profileUrlInputRef} required />
      </div>
      <div className={classes.action}>
        <button type="submit" className={classes.update}>Update</button>
        <button type="button" onClick={cancelHandler} className={classes.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
