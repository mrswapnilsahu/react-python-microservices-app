/**
 * Reusable Toast component
 * @param {string} toastMsg msg you want to print in toast
 * @param {string} lastSaved last saved time
 * 
 */

 export const Toast = ({ toastMsg, lastSaved }) => {
  return (
    <div className="toast">
      <span className="toast-header">
        Last Saved at <span className="last-saved">{lastSaved}</span>
      </span>
      <span className="toast-msg">
        {toastMsg} <span className="spinner"></span>
      </span>
    </div>
  );
};
