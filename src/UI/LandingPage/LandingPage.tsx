import React from "react";
import { useState } from "react";
import classes from "./LandingPage.module.css";

interface Service {
  name: string;
  price: number;
  duration: number;
}

const services: Service[] = [
  { name: "Haircut", price: 20, duration: 30 },
  { name: "Shave", price: 15, duration: 20 },
  { name: "Beard Trim", price: 10, duration: 15 },
];

function LandingPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  function handleServiceClick(service: Service) {
    setSelectedService(service);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to The Barber Shop</h1>
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>
      <main>
        <section className="hero-image">
          <h2>Get a fresh look today</h2>
          <button onClick={() => console.log("Book Now")}>Book Now</button>
        </section>
        <section className="services" id="services">
          <h2>Our Services</h2>
          <ul>
            {services.map((service) => (
              <li key={service.name}>
                <h3>{service.name}</h3>
                <p>Price: ${service.price}</p>
                <p>Duration: {service.duration} mins</p>
                <button onClick={() => handleServiceClick(service)}>
                  Select
                </button>
              </li>
            ))}
          </ul>
          {selectedService && (
            <div>
              <h3>{selectedService.name}</h3>
              <p>Price: ${selectedService.price}</p>
              <p>Duration: {selectedService.duration} mins</p>
              <button
                onClick={() => console.log(`Book ${selectedService.name}`)}
              >
                Book Now
              </button>
            </div>
          )}
        </section>
        <section className="about" id="about">
          <h2>About Us</h2>
          <p>
            We are a team of professional barbers with years of experience
            providing high-quality haircuts, shaves, and beard trims to our
            clients. Our shop is clean and comfortable, and we always strive to
            provide excellent customer service.
          </p>
        </section>
        <section className="contact" id="contact">
          <h2>Contact Us</h2>
          <p>
            123 Main Street
            <br />
            Anytown, USA 12345
            <br />
            Phone: (123) 456-7890
            <br />
            Email: info@thebarbershop.com
          </p>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 The Barber Shop</p>
      </footer>
    </div>
  );
}

export default LandingPage;
