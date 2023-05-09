import React from "react";
import About from "./Components/About";
import Home from "./Components/Home";
import Testimonial from "./Components/Testimonials";
import Work from "./Components/Work";
import "./App.css";

const LandingPage = () => {
  return (
    <div className="App">
      <div>
        <Home />
        <About />
        <Work />
        <Testimonial />
      </div>
    </div>
  );
};

export default LandingPage;
