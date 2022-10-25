import React from 'react'
import "./cardviewevent.css"
export default function CardviewEvent({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
          <div className="eventaveiblec">

            <img src={PF + post.img} alt="" className="eventaveibleImg" />
            <div className="eventaveibledesc">
                {post.desc}
            </div>
          </div>
  )
}
