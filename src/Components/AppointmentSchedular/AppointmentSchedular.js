import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import BannerBackground from "../../Assets/home-banner-background.png";
import Navbar from "../Navbar";
import BarberCard from "../BarberCard/BarberCard";
import ProfilePic from "../../Assets/john-doe-image.png";
import classes from "./AppointmentSchedular.module.css";
const AppointmentSchedular = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [availableBarbers, setAvailableBarbers] = useState([]);

  const [availableBarbersByTime, setAvailableBarbersByTime] = useState([]);

  useEffect(() => {
    const fetchBarbers = async () => {
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

        const month = selectedDate?.split("-")[2];
        const day = selectedDate?.split("-")[1];

        const barbersAndTheirFreeAppointments = await Promise.all(
          barbers?.map(async (barber) => {
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
      } catch (err) {
        console.log(err.message);
      }
    };

    if (selectedDate) {
      fetchBarbers();
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    const filteredBarbersByTime = availableBarbers.filter((barber) => {
      barber?.freeBarberAppointments?.data?.find((interval) => {
        return interval.from === time;
      });
    });

    setAvailableBarbers(filteredBarbersByTime);
  };

  return (
    <div>
      <Navbar />

      <div className={classes.App}>
        <div className={classes.homeContainer}>
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
            </div>

            {selectedDate && (
              <>
                <h3>Available Barbers:</h3>
                <div className={classes.cardGrid}>
                  {availableBarbers?.map((barber) => (
                    <BarberCard
                      className={classes.barberCard}
                      key={barber.dbBarber.id}
                      title={`${barber.dbBarber.firstName} ${barber.dbBarber.lastName}`}
                      date={selectedDate}
                      experience={barber.dbBarber.experience}
                      description={barber.dbBarber.description}
                      image={ProfilePic}
                      rating={barber.dbBarber.rating}
                      appointments={barber.freeBarberAppointments}
                      barberId={barber.dbBarber.id}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedular;
