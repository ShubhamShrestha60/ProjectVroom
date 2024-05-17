import React from "react";
import { FaDollarSign, FaCar, FaBook, FaWrench } from "react-icons/fa"; // Import Font Awesome icons
import "./whychooseus.css";

function Whychooseus() {
  return (
    <div className="whychooseus">
      <div className="container">
        <div className="section-head col-sm-12">
          <h4>
            <span>Why Choose</span> Us?
          </h4>
          <p>
            At Vroom, we aim to make your journey in Nepal smooth and enjoyable.
            <br />
            Discover why we are the preferred choice for car rentals:
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <div className="item">
              <span className="icon feature_box_col_one">
                <FaDollarSign />
              </span>
              <h6>Affordable Pricing</h6>
              <p>
                Enjoy competitive pricing with no hidden costs. We offer transparent pricing structures and various packages to suit your budget, ensuring you get the best value for your money.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item">
              <span className="icon feature_box_col_two">
                <FaCar />
              </span>
              <h6>Extensive Fleet of Vehicles</h6>
              <p>
                Whether you're looking for a compact car for city driving, a rugged SUV for mountain adventures, or a luxury vehicle for special occasions, we have a wide range of well-maintained cars to meet all your needs.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item">
              <span className="icon feature_box_col_three">
                <FaBook />
              </span>
              <h6>Easy Booking Process</h6>
              <p>
                Our user-friendly online platform allows you to book a car quickly and effortlessly. With just a few clicks, you can reserve the perfect vehicle for your trip, making your rental experience smooth and hassle-free.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item">
              <span className="icon feature_box_col_four">
                <FaWrench />
              </span>
              <h6>Well-Maintained Vehicles</h6>
              <p>
                All our vehicles undergo regular maintenance and thorough inspections to ensure they are in excellent condition. Your safety and comfort are our top priorities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whychooseus;
