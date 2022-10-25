import  './post.css'
import {MoreVert} from"@material-ui/icons"
import axios from "axios";
import {useContext, useState} from "react";
import { useEffect } from 'react';
import {format} from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContex } from '../../context/AuthContext';
import { AiFillDelete} from "react-icons/ai";
export default function Post({post}) {
  const [like,setLike]= useState(post.likes.length);
  const [isliked,setisLiked]= useState(false);
  const [user,setUser]= useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContex)

  useEffect(()=>{
    setisLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])

  useEffect(()=>{
    const fetchUser = async()=>{
      const res = await axios.get(`/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser();
  },[post.userId])
  

  const likeHandler = ()=>{
    try {
      axios.put("/posts/" + post._id + "/like",{userId:currentUser._id})
    } catch (err) {
      
    }
    setLike(isliked ? like -1 : like+1)
    setisLiked(!isliked)
  }
  const deletePost = async()=>{
    try{
       await axios.delete(`/posts/${post._id}`,{
       userId : post.userId});
       window.location.reload();
      }

    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
        <div className="post">
            <div className="postwrap">
                <div className="postop">
                    <div className="posttopleft">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF+"./avatar.jpg"} alt="" className="postprofileimg" /> 
                      <Link to = {`profile/${user.username}`} style={{textDecoration:"none"}} >
                      <span className="posname">{user.username}</span>
                        
                      </Link>
                      
                        <span className="timeofupdate">{format(post.createdAt)}</span>

                    </div>
                    <div className="postTopright">
                        {post.userId === currentUser._id && (
                          <AiFillDelete className='deletepost' onClick={deletePost}/>
                        )}
                        
                        <MoreVert/>

                    </div>
                    .
                </div>
                <div className="postCenter">
                    <span className="posttext">{post?.desc}</span>
                    <div>
                      <img src={PF + post.img } alt="" className="postImg" />
                      
                    </div>
                </div>
                <div className="postbottom">
                    <div className="postbottomleft">
                        <img src={`${PF}like.jpg`} alt="" className="likeIcon" onClick={likeHandler}/>
                        <span className="likecounter"> {like}</span>
                    </div>
                    <div className="postbottomright">
                      <span className="postcommenttext"> {post.comment} </span>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  )
}
