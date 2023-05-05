import "./App.css";
import AppointmentSchedular from "./Components/AppointmentSchedular/AppointmentSchedular";
import Register from "./Components/Register/Register";
import FirstPage from "./FirstPage";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FirstPage />} />
        <Route path="register" element={<Register />} />
        <Route path="appointment" element={<AppointmentSchedular />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
