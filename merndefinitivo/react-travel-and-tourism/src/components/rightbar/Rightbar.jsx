import './rightbar.css'
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import axios from "axios";
import { useContext } from 'react';
import { AuthContex } from '../../context/AuthContext';
import Cardview from '../cardview/Cardview';
import CardviewEvent from '../cardviewEvent/CardviewEvent';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import ReactDOM from 'react-dom/client'
export default function Rightbar({ user }, { username }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContex);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id })
      }
      else {
        await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed)
    } catch (err) {
      console.log(err);
    }
    startChat();
  };
 
  const startChat = async ()=>{
    try  {
      try{
        const res = await axios.get(`/conversatio/${user.id}/${currentUser._id}`)
      }
      catch(err){
        const prov = {
        senderId: user._id,
        receiverId : currentUser._id,
      }
      console.log(prov);
      const res = await axios.post("/conversations" , prov)
      }
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const res = currentUser.username
        ? await axios.get("/posts/timeline/" + currentUser._id)
        : await axios.get("/posts/profile/" + currentUser.username);
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      })
      );
    }
    fetchPosts();
  }, [currentUser.username, currentUser._id]);

  var counter = 0;
  var Postplace = posts.filter(p => p.tipo === "Luogo");
  function SliderPlus() {
    var el = document.getElementById("slicePlace");
    if (counter < Postplace.length - 1) {

      counter++;
      var cc = React.createElement(
        Cardview, {
        key: Postplace[counter]._id,
        post: Postplace[counter],
      }
      )
      el.removeChild(el.firstChild);
      const root = ReactDOM.createRoot(el);
      root.render(cc);
    }

  }
  function SliderMenus() {
    Postplace = posts.filter(p => p.tipo === "Luogo");
    var el = document.getElementById("slicePlace");

    if (counter > 0) {
      counter--;
      var cc = React.createElement(
        Cardview, {
        key: Postplace[counter]._id,
        post: Postplace[counter],
      }
      )
      el.removeChild(el.firstChild);
      const root = ReactDOM.createRoot(el);
      root.render(cc);


    }
  }
  
  var counterRist = 0;
  var PostRist = posts.filter(p => p.tipo === "Ristorante");
  console.log(PostRist);
  function SliderPlusR() {
    var el = document.getElementById("sliceRistorante");
    if (counterRist < PostRist.length - 1) {

      counterRist++;
      var cc = React.createElement(
        Cardview, {
        key: PostRist[counterRist]._id,
        post: PostRist[counterRist],
      }
      )
      el.removeChild(el.firstChild);
      const root = ReactDOM.createRoot(el);
      root.render(cc);
    }

  }
  function SliderMenusR() {
    var el = document.getElementById("sliceRistorante");

    if (counterRist > 0) {
      counterRist--;
      var cc = React.createElement(
        Cardview, {
        key: PostRist[counterRist]._id,
        post: PostRist[counterRist],
      }
      )
      el.removeChild(el.firstChild);
      const root = ReactDOM.createRoot(el);
      root.render(cc);


    }
  }

  const HomeRightbar = () => {
    return (
      <>  <div className="containerall">
        <div className="POCO">
          {(!username || username === user.username)

          }
          {posts.filter(p => p.tipo === "Luogo").at(0) &&
            <div id="slicePlace">
              <Cardview key={posts.filter(p => p.tipo === "Luogo").at(0)._id} post={posts.filter(p => p.tipo === "Luogo").at(0)} className="dioporco" />
            </div>
          }
          <div className='conainerbtn'>
            <button onClick={SliderMenus} className="btnchange"> prec</button>
            <button onClick={SliderPlus}className="btnchange"> succ</button>
          </div>

        </div>
        <div>
          {posts.filter(p => p.tipo === "Ristorante").at(0) &&
            <div id="sliceRistorante">
              <Cardview key={posts.filter(p => p.tipo === "Ristorante").at(0)._id} post={posts.filter(p => p.tipo === "Ristorante").at(0)} className="dioporco" />
            </div>
          }
          <div className='conainerbtn'>
            <button onClick={SliderMenusR} className="btnchange"> prec</button>
            <button onClick={SliderPlusR} className="btnchange"> succ </button>
          </div>
        </div>
        
        <div className="texteventi" ><b> Eventi</b></div>
        <div className="eventaveible">
          {posts.filter(p => p.tipo === "Evento").map((p)=>(
          <CardviewEvent key ={p._id} post={p}/>
        ) )}


        </div>

      </div>
      </>
    )
  }
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarfollowbtnr" onClick={handleClick} >
            {followed ? "Segui già" : "Segui"}
            {followed ? <AiOutlineMinusSquare className="iconaddr" /> : <AiOutlinePlusSquare className="iconaddr" />}

          </button>
        )}
        <div className='rightbarwrapP'>
          <h4 className='rightbarTitle'>informazione utente</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Citta :</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Nazionalità :</span>
              <span className="rightbarInfoValue"> {user.nazionality}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Sesso :</span>
              <span className="rightbarInfoValue">M</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">I miei Viaggi :</span>
              <span className="rightbarInfoValue">Maletto,Randazzo,Maniace,Cesaro</span>
            </div>
          </div>
          <h4 className="rightbarTitle">I tuoi amici</h4>
          <div className="rihtbarFollowings">
            {friends.map((friend) => (
              <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }} className="linkusers">
                <div className="rightbarFollowing">
                  <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "./avatar.jpg"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollwingName">{friend.username}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </>)
  }
  return (

    <div className="rightbar">
      <div className="rightbarwrap">
        {user ? <ProfileRightbar /> : <HomeRightbar username={username} />}
      </div>
    </div>
  )
}
