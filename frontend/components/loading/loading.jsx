import React from 'react';
import MyIcon from '../svg/icon.svg';

const Loading = () => {
  return(
    <div className="loading">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading;
