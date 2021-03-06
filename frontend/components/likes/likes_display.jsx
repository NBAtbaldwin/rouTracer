import React from 'react';


const LikeDisplay = ({activity, likes, users}) => {

  if (likes.length > 0) {
    return (
      <div className="likes-display">
        {likes.map((like, idx) => {
          if(idx < 11 && users[parseInt(like.user_id)]) {
            return(
              <img key={idx} src={users[parseInt(like.user_id)].photoUrl}></img>
            )
          } else if (idx < 11 && !users[parseInt(like.user_id)]) {
            return(
              <div className="photo-placeholder" key={idx}></div>
            )
          }
        })}
        <p>{`${likes.length} like${likes.length > 1 ? "s" : ""}`}</p>
      </div>
    )
  } else {
    return (
      <div className="likes-display"></div>
    )
  }
}

export default LikeDisplay;
