import logo from "./logo.png";
import { Link } from "react-router-dom";
import React, { useState} from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Test() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', formData)
    .then(result =>{console.log(result)
      if(result.data === "Success"){
        navigate('/home')
      }
    })
    .catch(err=> console.log(err)) 
  };
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
      borderRadius: "10px",
      border: "2px solid #000000",
      padding: "20px",
    },
    email: {
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
      <form className="Login" style={styles.Login} onSubmit={handleSubmit}>
        <img src={logo} alt="" style={styles.img} />

        <label htmlFor="my-email" style={styles.label}>
          Email
        </label>
        <input id="Email" type="Email" style={styles.email} name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="my-password" style={styles.label}>
          Password
        </label>
        <input id="my-password" type="password" style={styles.password} name="password" value={formData.password} onChange={handleChange} />

        <button style={styles.button}>Login</button>

        <p style={styles.forgotPassword}>Forget Password?</p>

        <p style={styles.signUp}>
          Don't have an account yet? <span style={{ color: "#5CB3FF" }}><Link to="/signup">Sign up</Link></span>
        </p>
      </form>
    </div>
  );
}