import React, { useRef, useEffect } from "react";
import styles from "./AppointmentMenu.module.css";

const AppointmentMenu = ({ appointments, onSelect, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    //TODO Finish the onClose and onSelect actions
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.appointmentMenu} onClick={onClose}>
      <div
        className={styles.appointmentList}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.title}>Available Appointments</h3>
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={styles.appointmentItem}
            onClick={() => onSelect(appointment)}
          >
            {appointment.time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentMenu;
