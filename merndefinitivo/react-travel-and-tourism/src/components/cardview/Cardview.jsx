import React from 'react'
import "./cardview.css"
export default function Cardview({post}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>

        <div className="placecontainer">       
                <img  alt="" src={PF +post.img || PF+ "like.jpg"} className="imgl"  />
                <div className="prova">
                  <div className="containertext">
                    <span >{post.tipo}</span>
                    <p>{post?.desc}
                    </p>
                  </div>  
                </div>
        </div>

    </>
  )
}
