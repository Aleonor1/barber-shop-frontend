import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import classes from "./BarberCard.module.css";

function BarberCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { title, date, description, image, rating } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={title} subheader={date} />

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
      </CardContent>
    </Card>
  );
}

export default BarberCard;
