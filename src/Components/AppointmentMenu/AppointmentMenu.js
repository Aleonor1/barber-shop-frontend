import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import AppointmentSelector from "../AppointmentSelector/AppointmentSelector";

const AppointmentMenuContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 9999,
}));

const AppointmentMenuContent = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "#fff",
  padding: "20px",
  boxShadow: "0px 2px 8px rgba(0,0,0,0.3)",
  overflow: "auto",
  maxHeight: "80vh",
}));

const AppointmentMenuItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

const AppointmentMenu = ({ onClose, appointments }) => {
  const [isHourSelected, setIsHourSelected] = useState(false);
  const navigate = useNavigate();

  const onSelect = (appointment) => {
    setIsHourSelected(true);
    // navigate("/");
  };

  return (
    <div>
      {!isHourSelected && (
        <AppointmentMenuContainer onClick={onClose}>
          <AppointmentMenuContent onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: "20px" }}>Available Appointments</h3>
            {appointments?.map((appointment) => (
              <AppointmentMenuItem
                key={appointment.id}
                onClick={() => onSelect(appointment)}
              >
                {appointment.time}
              </AppointmentMenuItem>
            ))}
          </AppointmentMenuContent>
        </AppointmentMenuContainer>
      )}
      {isHourSelected && (
        <AppointmentSelector
          date={123}
          time={123}
          setIsHourSelected={setIsHourSelected}
        />
      )}
    </div>
  );
};

export default AppointmentMenu;
