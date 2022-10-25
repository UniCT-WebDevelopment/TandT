import './sidebar.css'
import{Search, FlightTakeoffRounded ,Fastfood, RssFeedRounded ,PlaceRounded,ChatRounded ,EventAvailable,EventNote} from "@material-ui/icons"
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContext";

export default function Sidebar() {
  const {user} = useContext(AuthContex);
  //to={`/chat/${user._id}`}
  return (
    <div className="sidebar">
      <div className="sidebarwrap">
        <ul className='siderbarList'>
          <Link to="/messenger"  style={{color:"black",textDecoration:"none"}}>
            <li className="sidebarListItem">
              <ChatRounded className="sidebarIcon" />
              <span className="sidebarLiItemtext">Messaggi</span>
            </li>
            </Link>
            <li className="sidebarListItem">
              <FlightTakeoffRounded className="sidebarIcon" />
              <span className="sidebarLiItemtext">Viaggi</span>
            </li>
            <Link to="/place" style={{color:"black",textDecoration:"none"}}>
            <li className="sidebarListItem">
              
                <PlaceRounded className="sidebarIcon" />
                <span className="sidebarLiItemtext">Luoghi</span>
              
            </li>
            </Link>
            <Link to="/event" style={{color:"black",textDecoration:"none"}}>
            <li className="sidebarListItem">
              <EventNote className="sidebarIcon" />
              <span className="sidebarLiItemtext">Eventi</span>
            </li>
            </Link>
            <Link to="/ristoraunt" style={{color:"black",textDecoration:"none"}}>
            <li className="sidebarListItem">
              <Fastfood className="sidebarIcon" />
              <span className="sidebarLiItemtext">Ristoranti</span>
            </li>
            </Link>
        </ul>
        
    </div>
    </div>
  )
}
