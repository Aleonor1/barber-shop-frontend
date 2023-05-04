import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Register from "./Components/Register/Register";
import Testimonial from "./Components/Testimonials";
import Work from "./Components/Work";
import FirstPage from "./FirstPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FirstPage />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
