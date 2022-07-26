import React from 'react'

const Toast = ({ toastMsg, lastSaved }) => {
  return (
    <div className="toast">
      <span className='toast-header'>
        Last Saved at <span className='last-saved'>{lastSaved}</span>
      </span>
      <span className='toast-msg'>
        {toastMsg} <span className="spinner"></span>
      </span>
    </div>
  );
};

export default Toast