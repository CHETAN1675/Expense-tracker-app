import { createContext,useEffect,useState } from "react";

const AuthContext = createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});

export const AuthContextProvider = (props)=>{
    const intialState = localStorage.getItem("token");
const [token,setToken] = useState(intialState);

const userIsLoggedIn = !!token;

const LoginHandler = (token)=>{
setToken(token)
localStorage.setItem("token",token);
};

const LogoutHandler = ()=>{
    setToken(null)
    localStorage.removeItem("token");
};

useEffect(()=>{
let logoutTimer;

if(userIsLoggedIn){
    logoutTimer = setTimeout(()=>{
        LogoutHandler();
        alert("You have been logged out due to inactivity.");
    },5*60*1000);
}

return()=> clearTimeout(logoutTimer);
},[userIsLoggedIn]);

const contextValue  ={
    token:token,
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