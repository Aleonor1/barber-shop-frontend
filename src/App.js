import "./App.css";
import AppointmentSchedular from "./Components/AppointmentSchedular/AppointmentSchedular";
import AppointmentsPage from "./Components/AppointmentsPage/AppointmentsPage";
import Login from "./Components/Login/Login";
import ProfilePage from "./Components/Profile/Profile";
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
        <Route path="profile" element={<ProfilePage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
