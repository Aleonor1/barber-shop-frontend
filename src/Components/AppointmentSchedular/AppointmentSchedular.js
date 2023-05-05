import React from "react";
import BannerBackground from "../../Assets/home-banner-background.png";
import Navbar from "../Navbar";
import { useState } from "react";
import ProfilePic from "../../Assets/john-doe-image.png";
import BarberCard from "../BarberCard/BarberCard";
import axios from "../../api/axios";
import classes from "./AppointmentSchedular.module.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppointmentMenu from "../AppointmentMenu/AppointmentMenu";

const AppointmentSchedular = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableBarbers, setAvailableBarbers] = useState([]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    // Call API to get available barbers for selected date
    // setAvailableBarbers(response.data);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      };

      const barbersIds = await axios.get(
        "barber/ids",
        JSON.stringify({}),
        config
      );

      const { data: barbers } = barbersIds;

      const month = selectedDate.split("-")[2];
      const day = selectedDate.split("-")[1];

      const barbersAndTheirFreeAppointments = await Promise.all(
        barbers.map(async (barber) => {
          const freeBarberAppointments = await axios.get(
            `barber/${barber}/freeAppointmentsOnDay?month=${
              parseInt(month) + 1
            }&day=${parseInt(day)}`,
            config
          );
          const barberQuery = await axios.get(`barber/${barber}`);
          const dbBarber = barberQuery.data;
          return { dbBarber, freeBarberAppointments };
        })
      );

      setAvailableBarbers(barbersAndTheirFreeAppointments);
      return barbersAndTheirFreeAppointments;
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const appointments = [
    { id: 1, time: "10:00 AM" },
    { id: 2, time: "11:00 AM" },
    { id: 3, time: "12:00 PM" },
    { id: 4, time: "1:00 PM" },
    { id: 5, time: "2:00 PM" },
    { id: 6, time: "3:00 PM" },
    { id: 7, time: "4:00 PM" },
    { id: 8, time: "5:00 PM" },
  ];

  const handleBarberSelect = (barber) => {
    // Make appointment for selected date, time and barber
  };
  return (
    <div className={classes.App}>
      <AppointmentMenu
        appointments={appointments}
        onSelect={handleSelect}
        onClose={handleClose}
      />
      <div className={classes.homeContainer}>
        <Navbar />
        <div className={classes.homeBannerContainer}>
          <div className={"home-bannerImage-container"}>
            <img src={BannerBackground} alt="" />
          </div>
        </div>
        <div className={classes.container}>
          <h1 className={classes.title}>Schedule Page</h1>
          <div className={classes.inputs}>
            <label htmlFor="date-picker">Select a Date:</label>
            <input
              type="date"
              id="date-picker"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
            />
            {selectedDate && (
              <>
                <label htmlFor="time-picker">Select a Time:</label>
                <input
                  type="time"
                  id="time-picker"
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                />
              </>
            )}
          </div>
          {selectedDate && (
            <div className={classes.cardGrid}>
              <h3>Available Barbers:</h3>
              <div className={classes.cardGrid}>
                {availableBarbers.map((barber) => (
                  <BarberCard
                    className={classes.barberCard}
                    key={barber.dbBarber.id}
                    title={`${barber.dbBarber.firstName} ${barber.dbBarber.lastName}`}
                    date={barber.dbBarber.experience}
                    description={barber.dbBarber.description}
                    image={ProfilePic}
                    rating={barber.dbBarber.rating}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedular;
