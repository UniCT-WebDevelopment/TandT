import "./login.css"
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom"

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user , isFetching, error, dispatch} = useContext(AuthContex);
    const handleClick = (e )=> {
        document.getElementsByClassName("boat")[0].classList.add('move');
        e.preventDefault()
        setTimeout (()=>{loginCall({email:email.current.value, password : password.current.value },dispatch)},1000);
        
        
    }
   
    console.log(user);
        console.log(isFetching)
    return (
    <div className="container">
            <div  className="containertitle">
                <img src="./assets/nuvole.jpg" alt="" className="nuvole" />
                <h3 className="Loginlogo"> <b>Travel tourism</b></h3>
                <span className="logindesc">
                        Posta foto, indica ristoranti, scopri eventi con milioni di utenti
                </span>
            </div>
        <div className="login">
            
            <div className="loginWrapper">
                <div className="loginLeft">
                    
                   
                    <div className="containerPh">
                        <img src="IMG_0237-DeNoiseAI-standard.jpg " alt="" className="img " />
                        <img src="./assets/_MG_8127.jpg " alt="" className="imgcontainerPh imgcontainerPh-1" />
                        <img src="./assets/_MG_6760-DeNoiseAI-standard.jpg" alt="" className="imgcontainerPh imgcontainerPh-2" />
                        <img src="./assets/_MG_6732-DeNoiseAI-standard.jpg" alt="" className="imgcontainerPh imgcontainerPh-3" />
                        <img src="./assets/_MG_5193-DeNoiseAI-standard.jpg" alt="" className="imgcontainerPh imgcontainerPh-4" />
                        <img src="./assets/_MG_6563-DeNoiseAI-standard.jpg" alt="" className="imgcontainerPh imgcontainerPh-6" />
                        <img src="./assets/_MG_8431-DeNoiseAI-standard.jpg" alt="" className="imgcontainerPh imgcontainerPh-7" />
                        <img src="./assets/1657709089206.jpg" alt="" className="imgcontainerPh imgcontainerPh-8" />
                        <img src="./assets/background.jpg" alt="" className="imgcontainerPh imgcontainerPh-9" />
                        <img src="./assets/IMG_7180.jpg" alt="" className="imgcontainerPh imgcontainerPh-10" />
                    </div>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" placeholder= "Email" className="loginInputEmail" required ref={email}/>
                        <input type="password" placeholder= "Password" className="loginInputPass" required minLength={8} ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching}>  { isFetching ?   <CircularProgress color= "blue"/> : "Log In"}</button>
                        <span className="loginForgot"><b> Password dimenticata? </b></span>
                        <button className="loginregistrerButton"><Link to="/register" style={{color:"black",textDecoration:"none"}}> <b>{ isFetching ?   <CircularProgress color= "blue"/> : "Crea un account"}</b> </Link></button>
            
                       
                        
                    </form>
             </div>
                
            </div>      
        </div>
        <div className="animation">
            <img src="./assets/boat.png" alt="" className="boat" onClick={ () =>  document.getElementsByClassName("boat")[0].classList.add('move')} />
        </div>
    </div>
    
  )
}
