import React from "react";
import About from "./Components/About";
import Home from "./Components/Home";
import Testimonial from "./Components/Testimonials";
import Work from "./Components/Work";
import "./App.css";
import Navbar from "./Components/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Home />
        <About />
        <Work />
        <Testimonial />
      </div>
    </div>
  );
};

export default LandingPage;
