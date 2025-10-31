import { useContext ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import "./ForgetPassword.css";

const ForgetPassword = ()=>{
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const emailInputRef = useRef();

    const passwordHandler = ()=>{
        const enteredEmail = emailInputRef.current.value;
        try{
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAa1oVJ9j-mWsgn2FGPdp4RStUzpBA4kq4",
               {
                method:"POST",
                headers: {"Content-Type":"application/json",},
                body:JSON.stringify({
                      requestType:"PASSWORD_RESET",
                      email:enteredEmail,
                }),
               } 
            )
            .then((res)=>{
                if(res.ok){
                    alert("Password reset link sent it your email");
                    navigate("/auth")
                }else{
                    throw new Error("Error while sendind password reset link");
                }
            })
            .catch((error)=>{
                console.log(error);
                alert("Enter valid Email")
            });
        } catch{
            alert("Enter valid email")
        }
    };


    return(
<div className="forget-password">
    <div className="control">
        <label htmlFor="email">Email</label>
        <input type="email"  id="email" ref= {emailInputRef} required/>
    </div>
    <button onClick={passwordHandler}>Reset Passowrd</button>
</div>
    );

};

export default ForgetPassword;