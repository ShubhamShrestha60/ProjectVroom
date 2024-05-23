import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./adminSignup.css"

export default function AdminSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstName:'',
        lastName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        axios.post('http://localhost:3002/signup', formData)
            .then(response => {
                console.log(response.data);
                navigate('/adminLogin');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className='adminsignup-form'>
            <h2>Admin Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="FirstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="LastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <div className="password-input">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>
                <div className="password-input">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                {passwordError && <p>{passwordError}</p>}
                <button type="submit">SignUp</button>
            </form>
            <p>
                Already have an account? <Link to="/adminlogin">Login</Link>
            </p>
        </div>
    );
}
