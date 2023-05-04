import React from "react";
import classes from "./PopUpMessage.module.css";

const PopUpMessage = ({ message, onClose }) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.popUp}>
        <div className={classes.message}>{message}</div>
        <button className={classes.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUpMessage;
