import React, { useState } from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Root = styled(Card)({
  maxWidth: 345,
  margin: 10,
});

const Yellow = styled(CardHeader)({
  backgroundColor: "#FE9E0E",
  color: "white",
});

const AppointmentCard = ({ appointment, onDelete }) => {
  const { service, date, barber, price, from } = appointment.appointment;
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  let navigate = useNavigate();

  const isPastAppointment = new Date(date) < new Date();
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const handleCancelAppointment = () => {
    setShowConfirmationDialog(true);
  };

  const handleCancel = async (id) => {
    const response = await axios.post(
      `/appointment/${id}/cancel`,
      JSON.stringify({}),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      }
    );

    if (response.status == 200) {
      navigate("/");
    }
  };

  const handleCloseConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  return (
    <Root>
      <Yellow
        title={`Appointment with ${
          appointment.barber?.firstName + " " + appointment.barber?.lastName
        }`}
        subheader={
          //To do add query for barber
          isPastAppointment ? "Past Appointment" : "Upcoming Appointment"
        }
        className={isPastAppointment ? "yellow" : ""}
      />
      <CardContent>
        <div>Services: {service.string}</div>
        <div>Appointment Date: {formattedDate}</div>
        <div>Hour: {from}</div>
        <div>Total Price: ${price}</div>
        {isPastAppointment ? (
          <Button variant="contained" color="primary" href="/">
            Recipe
          </Button>
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancelAppointment}
            >
              Cancel
            </Button>
            {showConfirmationDialog && (
              <div>
                <div>Are you sure you want to cancel this appointment?</div>
                <Button onClick={() => handleCancel(appointment.id)}>
                  Yes
                </Button>
                <Button onClick={handleCloseConfirmationDialog}>No</Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Root>
  );
};

export default AppointmentCard;
