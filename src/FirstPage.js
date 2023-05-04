import React from "react";
import About from "./Components/About";
import Home from "./Components/Home";
import Testimonial from "./Components/Testimonials";
import Work from "./Components/Work";
import "./App.css";

const LandingPage = () => {
  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Testimonial />
    </div>
  );
};

export default LandingPage;
