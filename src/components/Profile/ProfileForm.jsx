import { useRef, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import classes from "./ProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const fullNameInputRef = useRef();
  const profileUrlInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const cancelHandler = ()=>{
    navigate("/");
  };

  

  const updateProfile = async (event) => {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredPhotoUrl = profileUrlInputRef.current.value;
try{
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCprTZVW6b9fM51Dp_WL5C-T5yTGXa7t9s",
      {
        method: "POST",
        headers: { "Content-Type": "application/json"},
         body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredName,
          photoUrl : enteredPhotoUrl,
          returnSecureToken: true,
        }),
      }
    );
    
    const data = await response.json();
    console.log(data);

    fullNameInputRef.current.value ="";
    profileUrlInputRef.current.value = "";
   } catch (error){
      console.error(error);
     }
  };

  return (
    <div>
    <form className={classes.form} >
      <div className={classes.control}>
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          ref={fullNameInputRef} 
          required
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="photo-url">Profile Photo URL</label>
        <input
          type="text"
          id="photo-url"
          ref={profileUrlInputRef} 
          required
        />
      </div>
      <div className={classes.action}>
        <button onClick={updateProfile} className={classes.update}>Update</button>
         <button onClick={cancelHandler} className={classes.cancel}>Cancel</button>
      </div>
     </form>
    </div>
  );
};

export default ProfileForm;