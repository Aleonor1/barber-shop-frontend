import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Navbar from "../Navbar";

const Root = styled(Card)({
  maxWidth: 345,
  margin: 10,
});

const Yellow = styled(CardHeader)({
  backgroundColor: "#ffff8d",
});

const AppointmentCard = ({ appointment }) => {
  const { services, createdDate, appointmentDate, barberName, price } =
    appointment;

  const isPastAppointment = new Date(appointmentDate) < new Date();

  return (
    <Root>
      <Yellow
        title={`Appointment with ${barberName}`}
        subheader={
          isPastAppointment ? "Past Appointment" : "Upcoming Appointment"
        }
        className={isPastAppointment ? "yellow" : ""}
      />
      <CardContent>
        <div>Services: {services}</div>
        <div>Created Date: {createdDate}</div>
        <div>Appointment Date: {appointmentDate}</div>
        <div>Total Price: ${price}</div>
        <Button variant="contained" color="primary" href="/">
          Recipe
        </Button>
      </CardContent>
    </Root>
  );
};

const FlexContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});

const AppointmentsPage = () => {
  const appointments = [
    {
      services: "Haircut",
      createdDate: "2023-05-01",
      appointmentDate: "2023-05-10T09:00:00",
      barberName: "John",
      price: 25.0,
    },
    {
      services: "Beard trim",
      createdDate: "2023-04-25",
      appointmentDate: "2023-05-15T10:30:00",
      barberName: "Mike",
      price: 15.0,
    },
    {
      services: "Haircut and Beard trim",
      createdDate: "2023-04-20",
      appointmentDate: "2023-06-01T15:00:00",
      barberName: "Peter",
      price: 35.0,
    },
  ];

  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate) < new Date()
  );
  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate) >= new Date()
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
