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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <p className="primay-text">
          Sit amet commodo nulla facilisi nullam vehicula ipsum a. Tempor nec
          feugiat nisl pretium fusce id velit ut. Sit amet consectetur
          adipiscing elit ut aliquam purus. Pulvinar neque laoreet suspendisse
          interdum.
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
