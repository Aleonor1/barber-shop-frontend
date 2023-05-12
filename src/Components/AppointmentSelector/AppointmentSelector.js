import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function AppointmentSelector(props) {
  const { date, time, setIsHourSelected, barberId } = props;
  const [errorMessages, setErrorMessages] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  const [service, setService] = useState("");
  let navigate = useNavigate();

  const handleClose = () => {
    setIsHourSelected(false);
  };

  const handleSubmit = async (selectedDate, selectedTime, selectedService) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      };

      const user = JSON.parse(localStorage.getItem("user"));
      const date = new Date(selectedDate);

      const payload = {
        from: selectedTime,
        to: selectedTime ? selectedTime + 1 : null,
        date: date,
        clientId: user.id.toString(),
        barberId: barberId.toString(),
        service: selectedService,
      };

      const response = await axios.post(
        "/appointment",
        JSON.stringify(payload),
        config
      );
      console.log(response);
      if (response.status === 201) {
        setErrorMessages("");
        setSuccesMessage("Appointment scheduled successfully!");

        setTimeout(() => {
          navigate("/appointments");
        }, 3000);
      }
    } catch (exception) {
      if (exception?.response?.data.message) {
        setErrorMessages(exception.response.data.message);
      } else if (exception?.response?.data) {
        setErrorMessages(exception.response.data);
      } else {
        setErrorMessages(exception.message);
      }
    }
  };

  const services = [
    { value: "DIRECTORS_CUT", label: "Director's Cut" },
    { value: "CUT_WITH_SCISSORS", label: "Cut with Scissors" },
    { value: "BEARD_COLOR", label: "Beard Color" },
    { value: "HOT_TOWEL_SHAVE", label: "Hot Towel Shave" },
    { value: "STYLING", label: "Styling" },
    { value: "CAPILLARY_MASSAGE", label: "Capillary Massage" },
    { value: "EXTRA_WASH", label: "Extra Wash" },
  ];

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="lg">
      <DialogTitle id="form-dialog-title">Schedule Appointment</DialogTitle>
      <DialogContent>
        <TextField
          label="Selected Date"
          value={date}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <TextField
          label="Selected Time"
          value={time}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <TextField
          select
          label="Select Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          fullWidth
        >
          {services.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          onClick={() => handleSubmit(date, time, service)}
          color="primary"
        >
          Submit
        </Button>
        {errorMessages &&
          (Array.isArray(errorMessages) ? (
            errorMessages.map((error) => (
              <Alert key={error} severity="error">
                {error}
              </Alert>
            ))
          ) : (
            <Alert severity="error">{errorMessages}</Alert>
          ))}

        {succesMessage && <Alert severity="success">{succesMessage}</Alert>}
      </DialogContent>
    </Dialog>
  );
}

export default AppointmentSelector;
