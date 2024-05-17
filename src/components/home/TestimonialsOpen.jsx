import React from "react";
import { FaSmile, FaMapMarkerAlt, FaCar, FaStar } from "react-icons/fa"; // Import Font Awesome icons
import styles from "./TestimonialsOpen.module.css";

function Testimonials() {
  return (
    <div className={styles.Testimonials}>
      <div className={styles.Journey}>
        <h3>Our Journey so far</h3>
        <div className={styles.Journey__Icons__Container}>
          <div className={styles.Journey__Icons}>
            <FaSmile className={styles.icon} />
            <div>
              <h4>1k+</h4>
              <p>Happy Vroomers</p>
            </div>
          </div>
          <div className={styles.Journey__Icons}>
            <FaMapMarkerAlt className={styles.icon} />
            <div>
              <h4>10+ Cities</h4>
              <p>Across Nepal</p>
            </div>
          </div>
          <div className={styles.Journey__Icons}>
            <FaCar className={styles.icon} />
            <div>
              <h4>100k+</h4>
              <p>Kms Travelled</p>
            </div>
          </div>
          <div className={styles.Journey__Icons}>
            <FaStar className={styles.icon} />
            <div>
              <h4>4.3/5</h4>
              <p>5k+ reviewers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
