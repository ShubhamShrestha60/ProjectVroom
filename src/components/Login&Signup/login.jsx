import logo from "./logo.png";
import { Link } from "react-router-dom";

export default function Test() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
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
    username: {
      width: "100%",
      height: "40px",
      marginBottom: "15px",
      border: "1px solid black",
      borderRadius: "10px",
      boxSizing: "border-box",
      paddingLeft: "10px",
    },
    password: {
      width: "100%",
      height: "40px",
      marginBottom: "15px",
      border: "1px solid black",
      borderRadius: "10px",
      boxSizing: "border-box",
      paddingLeft: "10px",
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
    forgotPassword: {
      textAlign: "right",
      fontSize: "12px",
      marginTop: "10px",
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

        <label htmlFor="my-name" style={styles.label}>
          Username
        </label>
        <input id="my-name" type="text" style={styles.username} />

        <label htmlFor="my-password" style={styles.label}>
          Password
        </label>
        <input id="my-password" type="password" style={styles.password} />

        <button style={styles.button}>SIGN IN</button>

        <p style={styles.forgotPassword}>Forget Password?</p>

        <p style={styles.signUp}>
          Don't have an account yet? <span style={{ color: "#5CB3FF" }}><Link to="/signup">Sign up</Link></span>
        </p>
      </div>
    </div>
  );
}
