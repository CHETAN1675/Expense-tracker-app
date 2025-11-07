import { createContext, useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./auth-slice";


const AuthContext = createContext({
    token:"",
    email: "",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});

export const AuthContextProvider = (props)=>{
    const intialState = localStorage.getItem("token");
    const initialEmail = localStorage.getItem("email");
    const [token,setToken] = useState(intialState);
    const [email, setEmail] = useState(initialEmail);
//this is redux dispatch
     const dispatch = useDispatch();

     const userIsLoggedIn = !!token;

const LoginHandler = (token,email)=>{
  setToken(token)
  setEmail(email);
  localStorage.setItem("token",token);
  localStorage.setItem("email", email);

   //dispatch actions
    dispatch(authActions.login({ email: email, token: token }));
};


const LogoutHandler = ()=>{
      setToken(null)
      setEmail(null);
      localStorage.removeItem("token");
      localStorage.removeItem("email");

      //dispatch actions
    dispatch(authActions.logout());
};

useEffect(()=>{
let logoutTimer;

if(userIsLoggedIn){
    logoutTimer = setTimeout(()=>{
        LogoutHandler();
        alert("You have been logged out due to inactivity.");
    },60*60*1000);
}

return()=> clearTimeout(logoutTimer);
},[userIsLoggedIn]);

const contextValue  ={
    token:token,
    email: email,
    isLoggedIn:userIsLoggedIn,
    login:LoginHandler,
    logout:LogoutHandler,
};

return(
    <AuthContext.Provider value ={contextValue}>
        {props.children}
    </AuthContext.Provider>
);
};

export default AuthContext;