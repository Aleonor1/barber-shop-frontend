import React from "react";
import { useState, useContext } from "react";
import axios from "../../api/axios";
import classes from "./Login.module.css";
import Alert from "@mui/material/Alert";
import FormInput from "../../Components/FormInput/FormInput";
import AuthContext from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import BannerImage from "../../Assets/za-barbershop-background-image2.png";

const Login = ({ setToken }) => {
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters anhandleSubmitd include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [showPopUp, setShowPopUp] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const { login } = useContext(AuthContext);

  // const handleRedirectToRegister = () => {
  //   navigate("/register");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = values;
      const response = await axios.post(
        "/clients/login",
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      if (response.status == 200) {
        const user = response.data.user;
        login(user);
        setShowPopUp(true);
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={classes.app}>
        <div>
          <img src={BannerImage} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Submit</button>
          <a href="/register">Not a user? Register!</a>
        </form>
      </div>
      {showPopUp && (
        <Alert severity="success" color="info">
          Logged in with succes!
        </Alert>
      )}
    </div>
  );
};

export default Login;
