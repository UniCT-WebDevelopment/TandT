import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Post from "../../components/post/Post"
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios";
import { useContext } from 'react';
import { AuthContex } from '../../context/AuthContext';
import  "./ristorant.css"

export default function Ristorant({username}) {

const [posts,setPosts] = useState([]);
const {user} = useContext(AuthContex);
useEffect(()=>{
  const fetchPosts = async()=>{
    const res =  username 
    ? await axios.get("/posts/profile/"+ username)
    : await axios.get("/posts/timeline/" + user._id);
    
    setPosts(res.data.sort((p1,p2)=>{
      return new Date(p2.createdAt) - new Date(p1.createdAt)
      })
    );
  }
  fetchPosts();
},[username,user._id]);
  return (
    <div>
        <Topbar/>
        <div className='containerPlace'>
            { posts.filter(p => p.tipo === "Ristorante" ).map((p)=>(
            <Post key ={p._id} post={p}/>
             ))}
        </div>
    </div>
  )
}
