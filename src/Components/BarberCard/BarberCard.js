import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import classes from "./BarberCard.module.css";
import AppointmentMenu from "../AppointmentMenu/AppointmentMenu";
import AuthContext from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function BarberCard(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const navigate = useNavigate();

  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  const handleMenuOpen = () => {
    if (isAuthenticated) {
      setMenuOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    handleMenuClose();
  };

  const {
    title,
    date,
    description,
    image,
    rating,
    appointments,
    experience,
    barberId,
  } = props;
  const appointmentsFormated = appointments?.data?.map((appointment) => {
    return { id: appointment.id, time: appointment.from };
  });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={title}
        subheader={experience}
        sx={{ textAlign: "center" }}
      />
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Rating:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                sx={{
                  color:
                    index < Math.floor(rating)
                      ? "primary.main"
                      : "action.disabled",
                  fontSize: "inherit",
                }}
              />
            ))}
            <p>{rating}</p>
          </Box>
        </Box>
        <Button
          variant="solid"
          size="sm"
          color="warning"
          sx={{ ml: "auto", fontWeight: 600 }}
          right="0"
          onClick={() => handleMenuOpen()}
        >
          Book
        </Button>
      </CardContent>
      {menuOpen && (
        <AppointmentMenu
          onClose={handleMenuClose}
          appointments={appointmentsFormated}
          barberId={barberId}
          date={date}
        />
      )}
    </Card>
  );
}

export default BarberCard;
