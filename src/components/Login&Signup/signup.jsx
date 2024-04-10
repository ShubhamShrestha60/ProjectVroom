
// import Login from './login.jsx'
import React, { useState } from 'react';
import logo from "./logo.png";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Test() {
  const navigate = useNavigate();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [prevMessage, setPrevMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const checkPasswordStrength = (password) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    if (!lowercaseRegex.test(password)) {
      return 0;
    } else if (!uppercaseRegex.test(password)) {
      return 1;
    } else if (password.length < 8) {
      return 2;
    } else {
      return 3;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if(name==='password'){
      clearTimeout(typingTimeout);
      const timeout = setTimeout(() => {
        displayPasswordStrength(value);
      }, 500); // Adjust the delay as needed
      setTypingTimeout(timeout);
  };
  }
    

  const displayPasswordStrength = (password) => {
    const strength = checkPasswordStrength(password);
    let message = '';
    if (strength === 0) {
      message = 'Password must contain at least one lowercase letter';
    } else if (strength === 1) {
      message = 'Password must contain at least one uppercase letter';
    } else if (strength === 2) {
      message = 'Password must contain at least eight characters';
    } else {
      setIsPasswordValid(true);
      if (messageId) {
        dismissToast();
      }
      return;
    }
    if (message !== prevMessage) {
      if (messageId) {
        toast.dismiss(messageId);
      }
      const newMessageId = toast.error(message);
      setMessageId(newMessageId);
      setPrevMessage(message);
    }
  };


    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
          console.log("Error: Passwords do not match");
          return;
      }
        axios.post('http://localhost:3001/register',formData)
        .then(result =>{
          console.log(result);
          navigate('/login');
        })
        .catch(err=>console.log(err))
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
      <ToastContainer />
      <form className="Login" style={styles.Login} onSubmit={handleSubmit}>
        <img src={logo} alt="" style={styles.img} />

        <div style={styles.inputGroup}>
          <input type="text" style={{ ...styles.input, flex: "1", marginRight: "5px" }} name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input type="text" style={{ ...styles.input, flex: "1", marginLeft: "5px" }} name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        </div>

        <label htmlFor="phone" style={styles.label}>
          Phone Number
        </label>
        <input id="phone" type="tel" style={styles.input} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input id="email" type="email" style={styles.input} name="email" value={formData.email} onChange={handleChange} />

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
        <input id="confirm-password" type="password" style={styles.input} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

        <button type="submit" style={styles.button}>Register</button>
        <p style={styles.signUp}>
         Already have an account? <span style={{ color: "#5CB3FF" }}><Link to="/login">Login</Link></span>
        </p>

      </form>
    </div>
  );
}