import React, { useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "../../api/axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const ClientProfilePage = (data) => {
  const theme = useTheme();

  const Root = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fffacd",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  }));

  const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  const FormControlWrapper = styled(FormControl)({
    margin: theme.spacing(1),
    minWidth: 120,
  });

  const SubmitButton = styled(Button)({
    marginTop: theme.spacing(2),
  });

  const handleSendMail = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(
        `clients/17/sendConfirmationLink`,
        JSON.stringify({}),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      console.log(response);
      if (response.status == 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSaveButton = async (updatedClientData) => {
    try {
      const response = await axios.patch(
        "/clients/login",
        JSON.stringify({
          updatedClientData,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      console.log(response);

      if (response.status == 200) {
        navigate("/profile");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [id, setId] = useState(user.id);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [userName, setUserName] = useState(user.userName);
  const [fidelityLevel, setFidelityLevel] = useState(user.fidelityLevel);
  const [status, setStatus] = useState(user.status);

  let navigate = useNavigate();

  const handleFidelityLevelChange = (event) => {
    setFidelityLevel(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <Root>
        <Typography variant="h4" align="center" gutterBottom>
          {`${firstName} ${lastName}`}
        </Typography>
        <Form>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
          />

          <div>
            <input
              type="date"
              id="date-picker"
              value={user.birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>

          <TextField
            label="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            margin="normal"
          />
          <FormControlWrapper>
            <TextField
              disabled
              label="Fidelity Level:"
              value={fidelityLevel}
              va
              margin="normal"
            />
          </FormControlWrapper>
          <FormControlWrapper>
            <TextField
              disabled
              label="Status"
              value={status}
              va
              margin="normal"
            />

            {status === "pending" && (
              <div>
                <Alert severity="warning">You have to verify your email!</Alert>
                <a href="" onClick={handleSendMail}>
                  Send confirmation mail again!
                </a>
              </div>
            )}
          </FormControlWrapper>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const updatedClientData = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                birthdate: birthdate,
                userName: userName,
                fidelityLevel: fidelityLevel,
                status: status,
              };
              handleSaveButton(updatedClientData);
            }}
          >
            Save
          </Button>
        </Form>
      </Root>
    </div>
  );
};

export default ClientProfilePage;
