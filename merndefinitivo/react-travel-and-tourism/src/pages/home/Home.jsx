import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import { AiOutlineBars ,AiOutlineMenuUnfold,AiFillHome,AiFillRightSquare,AiFillLeftSquare} from "react-icons/ai";
import "./home.css"
export default function Home(){
    const viewOption = ()=>{
        let a = document.getElementsByClassName("feed")[0];
        a.style.display = "none";
        let b =document.getElementsByClassName("sidebar")[0]
        b.style.display = "block";
        b.style.marginTop = "20px";
        b.style.backgroundColor = "rgb(231,220,199)";
        document.getElementsByClassName("iconsmartphone")[0].style.display = "none";
        document.getElementsByClassName("iconsmartphone")[2].style.display = "none";
        document.getElementsByClassName("iconsmartphone")[1].style.display = "inline-block";
    }
    const viewHome = ()=>{
        let a = document.getElementsByClassName("feed")[0];
        a.style.display = "block";
        let b =document.getElementsByClassName("sidebar")[0]
        b.style.display = "none";
        b.style.marginTop = "20px";
        document.getElementsByClassName("iconsmartphone")[0].style.display = "inline-block";
        document.getElementsByClassName("iconsmartphone")[2].style.display = "inline-block";
        document.getElementsByClassName("iconsmartphone")[1].style.display = "none";
        let c =document.getElementsByClassName("rightbar")[0];
        c.style.display = "none";
    }
    const viewRigth = ()=>{
        let a = document.getElementsByClassName("feed")[0];
        a.style.display = "none";
        let b =document.getElementsByClassName("rightbar")[0]
        b.style.display = "block";
        b.style.marginTop = "20px";
        b.style.backgroundColor = "rgb(231,220,199)";
        document.getElementsByClassName("iconsmartphone")[0].style.display = "none";
        document.getElementsByClassName("iconsmartphone")[2].style.display = "none";
        document.getElementsByClassName("iconsmartphone")[1].style.display = "inline-block";
    }
    const viewPadH = ()=>{
        let b =document.getElementsByClassName("rightbar")[0]
        b.style.display = "block";
        document.getElementsByClassName("iconsmartphonePad")[1].style.display = "inline-block";
        document.getElementsByClassName("iconsmartphonePad")[0].style.display = "none";
        let a = document.getElementsByClassName("feed")[0];
        a.style.display = "none";
    }
    const viewPadRight = ()=>{
        let b =document.getElementsByClassName("rightbar")[0]
        b.style.display = "none";
        document.getElementsByClassName("iconsmartphonePad")[1].style.display = "none";
        document.getElementsByClassName("iconsmartphonePad")[0].style.display = "inline-block";
        let a = document.getElementsByClassName("feed")[0];
        a.style.display = "block";
    }
    return (
        <>
            <Topbar/>
            <div className="containerIconeSmartph">
                <div className="csm">
                    <AiOutlineBars className="iconsmartphone" onClick={viewOption} ></AiOutlineBars>
                    <AiFillHome className="iconsmartphone" style={{display : "none"}} onClick={viewHome}></AiFillHome>
                    <AiOutlineMenuUnfold className="iconsmartphone" onClick={viewRigth}></AiOutlineMenuUnfold>
                </div>
                <div className="cdPad">
                    <AiFillRightSquare className="iconsmartphonePad" onClick={viewPadH}></AiFillRightSquare>
                    <AiFillLeftSquare  className="iconsmartphonePad" style={{display : "none"}} onClick={viewPadRight}></AiFillLeftSquare>
                </div>
            </div>
            <div className="Containerhome">
                <Sidebar/>
                <Feed />
                <Rightbar/>
             </div>
        </>
    )
}

