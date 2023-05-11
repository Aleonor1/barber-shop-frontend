import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Navbar from "../Navbar";
import { useState, useEffect, react } from "react";
import axios from "../../api/axios";
import AppointmentCard from "./AppointmentCard";

const FlexContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      let response;
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      };

      try {
        response = await axios.get(
          "clients/3/appointments",
          JSON.stringify({}),
          config
        );
      } catch (exception) {
        console.log(exception);
      }

      const data = response.data;
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) < new Date()
  );
  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) >= new Date()
  );

  return (
    <div>
      <Navbar />
      <div>
        <h1>Upcoming Appointments:</h1>
        <FlexContainer>
          {upcomingAppointments.map((appointment, index) => (
            <AppointmentCard appointment={appointment} key={index} />
          ))}
        </FlexContainer>
        <h1>Past Appointments:</h1>
        <FlexContainer>
          {pastAppointments.map((appointment, index) => (
            <AppointmentCard appointment={appointment} key={index} />
          ))}
        </FlexContainer>
      </div>
    </div>
  );
};

export default AppointmentsPage;
