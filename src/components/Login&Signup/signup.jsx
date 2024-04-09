// import Login from './login.jsx'
import logo from "./logo.png";
import { Link } from "react-router-dom";

export default function Test() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Set height to full viewport height
    },
    Login: {
      width: "80%", 
      maxWidth: "300px", 
      backgroundColor: "#ffffff",
      border: "2px solid black",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px 2px black",
      padding: "20px",
    },
    input: {
      width: "100%",
      height: "40px",
      marginBottom: "15px",
      border: "1px solid black",
      borderRadius: "10px",
      boxSizing: "border-box",
      paddingLeft: "10px",
    },
    inputGroup: {
      display: "flex",
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: "15px",
    },
    button: {
      backgroundColor: "#5CB3FF",
      width: "100%",
      height: "40px",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      marginTop: "15px",
    },
    img: {
      width: "100%",
      height: "auto",
      marginBottom: "15px",
    },
    signUp: {
      textAlign: "center",
      fontSize: "13px",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div className="Login" style={styles.Login}>
        <img src={logo} alt="" style={styles.img} />

        <div style={styles.inputGroup}>
          <input type="text" style={{ ...styles.input, flex: "1", marginRight: "5px" }} placeholder="First Name" />
          <input type="text" style={{ ...styles.input, flex: "1", marginLeft: "5px" }} placeholder="Last Name" />
        </div>

        <label htmlFor="phone" style={styles.label}>
          Phone Number
        </label>
        <input id="phone" type="tel" style={styles.input} />

        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input id="email" type="email" style={styles.input} />

        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <input id="password" type="password" style={styles.input} />

        <label htmlFor="confirm-password" style={styles.label}>
          Confirm Password
        </label>
        <input id="confirm-password" type="password" style={styles.input} />

        <button style={styles.button}>Register</button>

        <p style={styles.signUp}>
         Already have an account? <span style={{ color: "#5CB3FF" }}><Link to="/login">Login</Link></span>
        </p>
      </div>
    </div>
  );
}
