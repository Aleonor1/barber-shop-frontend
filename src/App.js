import "./App.css";
import AppointmentSchedular from "./Components/AppointmentSchedular/AppointmentSchedular";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import FirstPage from "./FirstPage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FirstPage classname="App" />} />
        <Route path="register" element={<Register />} />
        <Route path="appointment" element={<AppointmentSchedular />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
