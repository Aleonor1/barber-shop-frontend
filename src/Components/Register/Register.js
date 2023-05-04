import { useState, useEffect } from "react";
import FormInput from "../../Components/FormInput/FormInput";
import classes from "./Register.module.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const REGISTER_URL = "/clients";

const Register = () => {
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (showPopUp) navigate("/login", { replace: true });
    }, 3000);
  }, [showPopUp]);

  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

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
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 5,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 6,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 7,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    try {
      const { username, birthday, email, password, firstName, lastName } =
        values;
      const response = await axios.post(
        "/clients",
        JSON.stringify({
          lastName: lastName,
          firstName: firstName,
          birthday: birthday,
          email: email,
          password: password,
          username: username,
          experience: "Junior",
          username: "{{$randomUserName}}",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      console.log(JSON.stringify(response));
      if (response.status == 201) {
        setShowPopUp(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className={classes.app}>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Submit</button>
        </form>
      </div>
      {showPopUp && (
        <Alert severity="success" color="info">
          User created succesful!
        </Alert>
      )}
    </div>
  );
};

export default Register;
