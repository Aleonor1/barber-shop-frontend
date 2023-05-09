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

function AppointmentSelector(props) {
  const { date, time, setIsHourSelected } = props;

  const [service, setService] = useState("");

  const handleClose = () => {
    setIsHourSelected(false);
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      };

      await axios.post(
        "/appointment",

        JSON.stringify({
          from: "8:00",
          to: "9:00",
          month: 10,
          clientId: "4",
          barberId: "1",
          service: "DIRECTORS_CUT",
          day: 10,
        }),
        config
      );
    } catch (exception) {
      console.log(exception);
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
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AppointmentSelector;
