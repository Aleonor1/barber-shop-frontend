import React from "react";
import AboutBackgroundImage from "../Assets/stylish-man-sitting-barbershop.jpg";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        {/* <img src={AboutBackground} alt="" /> */}
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 classBane="primary-heading">
          Let us take care of your look and you won't regreat it!
        </h1>
        <p className="primay-text">
          Welcome to our barber shop where we specialize in taking care of your
          hair and grooming needs. Our experienced barbers are passionate about
          their craft and are committed to giving you the best possible
          experience. From classic haircuts to modern styles, we'll help you
          find a look that suits your personality and lifestyle. Trust us to
          take care of your look and you'll leave our shop feeling refreshed and
          confident.
        </p>

        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <a href="https://www.youtube.com/watch?v=ofldoY2d0q8&t=1s">
            <button className="watch-video-button">
              <BsFillPlayCircleFill /> Watch Video
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
