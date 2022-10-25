import "./topbar.css"
import { Search, PermContactCalendar, ChatRounded, NotificationsPausedRounded } from "@material-ui/icons";
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContext";
import { AiOutlineApi } from "react-icons/ai";
import axios from "axios";
import { useRef } from "react"
import { logoutCall } from "../../apiCalls"
import { useEffect } from "react";
export default function Topbar() {
  const { user, dispatch } = useContext(AuthContex);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const searchUsers = useRef();
  let searchuser = async () => {
    let ele = document.getElementsByClassName("searchInput")[0].value;
    console.log(ele);
    try {
      const Users = await axios.get(`/users/search/${ele}`);
      window.location.href = "/profile/" + ele;
    }
    catch (err) {
      alert("utente non trovato")
      console.log(err)
    }


  }
  const handleLogout = () => {
    logoutCall(dispatch);
  }


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">

        <img src="/assets/log.png" className="imglogo" alt="" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo"><b> Travel&tourism </b></div>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <div className="searchIcons">
            <Search onClick={searchuser} />
          </div>
          <input ref={searchUsers} placeholder="ricerca amici o post" className="searchInput" >
          </input>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="topLinks"><b className="Linkst">Home</b></span>
          </Link >

        </div>
        <div className="topbarIcons">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="topbarIconItem">
              <AiOutlineApi onClick={handleLogout} style={{ scale: "1.5",marginTop :"5px",marginRight:"10px",marginLeft:"10px"}}></AiOutlineApi>
            </div>
          </Link >
          <div className="topbarIconItem">
            <PermContactCalendar />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsPausedRounded />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatRounded />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? PF + user.profilePicture : PF + "./avatar.jpg"} alt="" className="topBarImg" />
        </Link>
      </div>
    </div>
  )
}
