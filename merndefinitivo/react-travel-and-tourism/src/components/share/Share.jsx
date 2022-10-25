import "./share.css"
import{BurstModeRounded,LocalOfferRounded,Room,Fastfood} from "@material-ui/icons"
import { useContext ,useState } from "react"
import { AuthContex } from "../../context/AuthContext"
import { useRef } from "react";
import axios from "axios";
import { AiFillDelete,AiFillCarryOut} from "react-icons/ai";
export default function Share() {
  const {user} = useContext(AuthContex);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;  
  const desc = useRef();
  const [file,setFile] = useState(null);
  var typeA = "";


  const submitHandler= async (e) =>{
    e.preventDefault();
    console.log(typeA);
    const newPost ={
        userId: user._id,
        desc : desc.current.value,
        tipo: typeA,
    };
    if(file){
        const data = new FormData();
        const fileName = Date.now() +  user.username + file.name ;
        data.append("name",fileName);
        data.append("file",file);
        newPost.img = fileName;
        console.log(newPost);
        try{
            await axios.post("/upload",data)
        }catch(err){
            console.log(err)
        }
    }
    try {
       await axios.post("/posts",newPost);
       window.location.reload();
    } catch  (err) {
        
    }
  }
  const choosetypePostLuogo = ()=>{
        
    if(document.getElementsByClassName("shareOption")[3].style.display === "none" && document.getElementsByClassName("shareOption")[3].style.display === "none"){
        document.getElementsByClassName("shareOption")[3].style.display = "";
        document.getElementsByClassName("shareOption")[4].style.display = "";
        typeA="";
    }
    else{
        typeA = "Luogo";
        document.getElementsByClassName("comment")[0].value += " #Luogo";
        document.getElementsByClassName("shareOption")[3].style.display = "none";
        document.getElementsByClassName("shareOption")[4].style.display = "none";
    }
  }
  const choosetypePostRistourant = ()=>{

    if(document.getElementsByClassName("shareOption")[2].style.display === "none" && document.getElementsByClassName("shareOption")[4].style.display === "none"){
        document.getElementsByClassName("shareOption")[2].style.display = "";
        document.getElementsByClassName("shareOption")[4].style.display = "";
        typeA="";
    }
    else{
        typeA = "Ristorante";
        document.getElementsByClassName("comment")[0].value += " #Ristorante";
        document.getElementsByClassName("shareOption")[2].style.display = "none";
        document.getElementsByClassName("shareOption")[4].style.display = "none";
    }
  }
  const choosetypePostEvent = ()=>{
    if(document.getElementsByClassName("shareOption")[2].style.display === "none" && document.getElementsByClassName("shareOption")[3].style.display === "none"){
        document.getElementsByClassName("shareOption")[2].style.display = "";
        document.getElementsByClassName("shareOption")[3].style.display = "";
        typeA="";
    }
    else{
        typeA = "Evento";
        document.getElementsByClassName("comment")[0].value += " #Evento";
        document.getElementsByClassName("shareOption")[2].style.display = "none";
        document.getElementsByClassName("shareOption")[3].style.display = "none";
    }
    
  }
  return (
    <div className="share"> 
        <div className="containerwrap">
            <div className="shareTop">
                <img src={user.profilePicture ? PF+ user.profilePicture : PF+"./avatar.jpg" } alt="" className="shareprofileImg" />
                <input type="text" ref={desc} className="comment" placeholder={"scrivi qualcosa " + user.username + " ?"}/>
            </div>
            <hr className="shareHr" />
            {file && (
                <div className="shareImgcontainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <AiFillDelete className="shareCancelImg" onClick={()=>setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <label htmlFor="file" className="shareOption">
                    <BurstModeRounded className="shareIcon" htmlColor = "darkblue"/>
                    <span className="option">Foto </span>
                    <input  style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])} className="" />
                    
                </label>
                <div className="shareOption">
                    <Room className="shareIcon" htmlColor = "green" onClick={choosetypePostLuogo}/>
                    <span className="option" onClick={choosetypePostLuogo}>Luogo</span>
                </div>
                <div className="shareOption">
                    <Fastfood className="shareIcon" htmlColor = "orange" onClick={choosetypePostRistourant}/>
                    <span className="option" onClick={choosetypePostRistourant} >Ristoranti</span>
                </div>
                <div className="shareOption">
                    <AiFillCarryOut className="shareIcon" style={{color:"teal"}} onClick={choosetypePostEvent} />
                    <span className="option" onClick={choosetypePostEvent}>Evento</span>
                </div>
                <div className="containershbutton"> 
                    <button className="sharebutton" type="submit" >Condividi</button>
                </div>
            </form>
        </div>
    </div>
  )
}
