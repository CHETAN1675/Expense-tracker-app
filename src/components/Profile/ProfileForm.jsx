import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const fullNameInputRef = useRef();
  const profileUrlInputRef = useRef();

  const [user, setUser] = useState({
    name: "",
    photo: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAa1oVJ9j-mWsgn2FGPdp4RStUzpBA4kq4",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        const userData = data.users[0];

        setUser({
          name: userData.displayName || "",
          photo: userData.photoUrl || "",
        });

        fullNameInputRef.current.value = userData.displayName || "";
        profileUrlInputRef.current.value = userData.photoUrl || "";
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const cancelHandler = () => {
    navigate("/");
  };

  const updateProfile = async (event) => {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredPhotoURL = profileUrlInputRef.current.value;

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAa1oVJ9j-mWsgn2FGPdp4RStUzpBA4kq4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: token,
            displayName: enteredName,
            photoUrl: enteredPhotoURL,
            returnSecureToken: true,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await res.json();
      console.log(data);
      setUser({
        name: data.displayName || "",
        photo: data.photoUrl || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="full-name">Full Name</label>
          <input type="text" id="full-name" ref={fullNameInputRef} required />
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
          <button onClick={updateProfile} className={classes.update}>
            Update
          </button>
          <button onClick={cancelHandler} className={classes.cancel}>
            Cancel
          </button>
        </div>
      </form>
      <div>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        {user.photo && <img src={user.photo} alt="pic" />}
      </div>
    </div>
  );
};

export default ProfileForm;
