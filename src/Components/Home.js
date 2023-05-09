import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/za-barbershop-background-image2.png";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  const goToAppointmentsPage = () => {
    navigate("/appointment");
  };
  let navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">You Favorite Barbershop</h1>
          <p className="primary-text">
            Welcome to Barbershop, the best spot in town for men's haircuts. Our
            experienced barbers are trained to give you the perfect look that
            you want.
          </p>
          <button onClick={goToAppointmentsPage} className="secondary-button">
            Appointment <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
