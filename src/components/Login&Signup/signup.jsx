// import Login from './login.jsx'
import React, { useState } from 'react';
import logo from "./logo.png";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function Test() {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  const displayPasswordStrength = (password) => {
    // Your password strength logic here
    // Example: You can check the length of the password and render a message based on its strength
    if (password.length < 8) {
      return 'Weak';
    } else if (password.length < 12) {
      return 'Moderate';
    } else {
      return 'Strong';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password) {
      setPasswordError('Password field should not be empty');
      return;
    // } else if (!/^(?=.[a-z])(?=.[A-Z])(?=.*[@])(?=.{8,})/.test(formData.password)) {
    //   setPasswordError('Password must contain at least one lowercase letter, one uppercase letter, one "@" symbol, and be at least eight characters long');
    //   return;
    }
    axios.post('http://localhost:3002/register', formData)
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
    console.log(formData);
  };


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
      borderRadius: "10px",
      border: "2px solid #000000", /* Adding border with color */
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
      <form className="Login" style={styles.Login} onSubmit={handleSubmit}>
        <img src={logo} alt="" style={styles.img} />

        <div style={styles.inputGroup}>
          <input type="text" style={{ ...styles.input, flex: "1", marginRight: "5px" }} name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
          <input type="text" style={{ ...styles.input, flex: "1", marginLeft: "5px" }} name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        </div>

        <label htmlFor="phone" style={styles.label}>
          Phone Number
        </label>
        <input id="phone" type="tel" style={styles.input} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input id="email" type="email" style={styles.input} name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <input 
          id="password" 
          type="password" 
          style={styles.input} 
          name="password" 
          value={formData.password} 
          onChange={(e) => {
            handleChange(e);
            displayPasswordStrength(e.target.value);
          }} 
        />
        
        <label htmlFor="confirm-password" style={styles.label}>
          Confirm Password
        </label>
        <input id="confirm-password" type="password" style={styles.input} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        
       
        <p id="passwordStrength">{displayPasswordStrength(formData.password)}</p>

        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        <button type="submit" style={styles.button}>Register</button>
        <p style={styles.signUp}>
          Already have an account? <span style={{ color: "#5CB3FF" }}><Link to="/login">Login</Link></span>
        </p>

      </form>
    </div>
  );
}