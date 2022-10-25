import "./register.css"
import {useRef } from "react"
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {AiFillDelete} from "react-icons/ai";
import{BurstModeRounded} from "@material-ui/icons"
import { useState } from "react"
export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const desc = useRef();
    const national = useRef();
    const citta= useRef();
    const navigate = useNavigate();
    const profileimg = useRef();
    const profilecoverimg = useRef();
    const [file,setFile] = useState(null);
    const [filecover,setFilecover] = useState(null);

    
    const handleClickcomplete =async (e)=> {
        e.preventDefault();
        
        if(email.current.value.includes("@")=== false){
            alert("email  non  valida ");
        }
        else if(password.current.value.length <8){
            alert("pass non valida min 8 caratteri")
        }
        else if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("le password non coincidono");
            alert("le password non coincidono");
        }
        
        else{
            
            document.getElementsByClassName("mongo")[0].classList.add('movem');
                
            if(file){
                const data = new FormData();
                var fileName = Date.now() + file.name;
                data.append("name",fileName);
                data.append("file",file);
                try{
                    await axios.post("/upload",data)
                }catch(err){
                    console.log(err)
                }
            }        
            if(filecover){
                const data2 = new FormData();
                var fileNamecover = Date.now() + filecover.name;
                data2.append("name",fileNamecover);
                data2.append("file",filecover);
                try{
                    await axios.post("/upload",data2)
                }catch(err){                    
                    console.log(err)
                }
            }
            var user ;
            if(file && filecover){
                user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    desc: desc.current.value,
                    nazionality: national.current.value,
                    city: citta.current.value,
                    profilePicture :fileName,
                    coverPicture :fileNamecover,         
                }
            }
            else if(file && !filecover){
                user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    desc: desc.current.value,
                    nazionality: national.current.value,
                    city: citta.current.value,
                    profilePicture :fileName,       
                }
            }
            else if(!file && filecover){
                user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    desc: desc.current.value,
                    nazionality: national.current.value,
                    city: citta.current.value,
                    coverPicture :fileNamecover,             
                }
            }
            else{
                user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    desc: desc.current.value,
                    nazionality: national.current.value,
                    city: citta.current.value,
                }
            }
            try{
                await axios.post("/auth/register",user);
                navigate("/login");
            }catch(err){
                console.log(err);
                alert("username non valido gia utilizzato")
            }            
        }
    }
    
  return (
    <div className="loginr">
        
        <div className="loginWrapperr">
            <div className="loginLeftr">
                <h3 className="Loginlogor"> Travel tourism</h3>
                <span className="logindescr">
                </span>
            </div>
            <div className="animationmr">
            <img src="./assets/mongo2.png" alt="" className="mongo" onClick={ () =>  document.getElementsByClassName("mongo")[0].classList.add('movem')} />
            </div>
            <div className="loginRightr">
                <form className="loginBoxr" >
                <span className="logindescr">Riempi i seguenti campi per completare la registrazione</span>
                    <input placeholder= "Username" required ref={username} className="loginInputEmailr " />
                   
                    <input placeholder= "Email" required ref={email} className="loginInputEmailr" type="email" />
        
                    <input type="password" required ref={password} placeholder= "Password (8 caratteri min)" className="loginInputPassr" minLength="8" />

                    <input type="password" required ref={passwordAgain} placeholder= "Conferma Password" className="loginInputPassr" minLength="8"/>
                    
                    <div className="containerRulesregisster">
                        <div className="slides">
                            <div className="slide">
                                <img src="./assets/_MG_6854-DeNoiseAI-standard.jpg" alt="" className="slide-image" />
                            </div>
                            <div className="slide slide2">
                                <img src="./assets/IMG_6112-DeNoiseAI-standard.jpg" alt="" className="slide-image" />
                            </div>
                            <div className="slide slide3">
                                <img src="./assets/_MG_7277.jpg" alt="" className="slide-image" />
                            </div>
                            <div className="slide slide4">
                                <img src="./assets/_MG_7092-DeNoiseAI-standard.jpg" alt="" className="slide-image" />
                            </div>
                            
                        </div>
                    </div>
                </form>
                <div className="containericondown">
                </div>
                <div className="maggioriInfo">
                <form className="loginBoxr" onSubmit={handleClickcomplete}>
                    <span className="logindescr">Riempi i seguenti campi per aggiungere altre informazioni</span>
                    <input  placeholder= "Descrizione"  ref={desc} className="loginInputEmailr"   />
                    <input ref={national} placeholder= "Nazionalità" className="loginInputPassr"  />
                    <input ref={citta} placeholder= "Città" className="loginInputPassr"  />
                    <div className="containerImgPicture"  >
                        <label htmlFor="file" className="shareOption" >
                            <BurstModeRounded className="shareIcon" htmlColor = "darkblue"/>
                            <span className="option">Foto Profilo </span>
                            <input  ref={profileimg} style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>{setFile(e.target.files[0]) }} className="rr" />
                        </label>
                        {file && (
                            <div className="containerpreviewImgP">
                            <img src={URL.createObjectURL(file)} alt="" className="postprofileimgr" />
                            <AiFillDelete className="shareCancelImgregister" onClick={()=>setFile(null)}/>
                            </div>
                        )}
                            
                    </div>
                    <div className="containerImgPicture" >
                        <label htmlFor="filecover" className="shareOption" >
                            <BurstModeRounded className="shareIcon" htmlColor = "darkblue"/>
                            <span className="option">Foto copertina </span>
                            <input  ref={profilecoverimg} style={{display:"none"}} type="file" id="filecover" accept=".png,.jpeg,.jpg" onChange={(e)=>{setFilecover(e.target.files[0]) }} className="" />
                        </label>
                        {filecover && (
                            <div className="containerpreviewImgPe">
                            <img src={URL.createObjectURL(filecover)} alt="" className="coverprofileimgree" />
                            <AiFillDelete className="shareCancelImgregisterc" onClick={()=>setFilecover(null)}/>
                            </div>
                        )}   
                    </div>
                    <button className="loginButtonr" type="submit"> <b>Registrati</b></button>
                </form>
                </div>
            </div>
            
        </div>      
        
    </div>

  )
}
