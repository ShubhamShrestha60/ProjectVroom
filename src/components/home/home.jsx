import { useState } from "react";
import Calendar from 'react-calendar';
import logo from "./card.png";
import logo1 from "./location.png";
import logo2 from "./car.png";
import logo3 from "./car.jpg"
import 'react-calendar/dist/Calendar.css';
import './home.css';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Home = ({setResults, results}) => {
    const currentDate = new Date();
    const [pickupDate, setPickupDate] = useState(currentDate);
    const [pickupTime, setPickupTime] = useState('12:00');
    const [dropoffDate, setDropoffDate] = useState(currentDate);
    const [dropoffTime, setDropoffTime] = useState('13:00'); // Set default drop-off time to be one hour after pick-up time

    const [showPickupCalendar, setShowPickupCalendar] = useState(false);
    const [showDropoffCalendar, setShowDropoffCalendar] = useState(false);
    const [showPickupTimetable, setShowPickupTimetable] = useState(false);
    const [showDropoffTimetable, setShowDropoffTimetable] = useState(false);

    const times = [
        '01:00', '02:00', '03:00', '04:00', '05:00',
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00', '23:00','24:00' 
    ];

    const togglePickupCalendar = () => {
        setShowPickupCalendar(!showPickupCalendar);
    };

    const toggleDropoffCalendar = () => {
        setShowDropoffCalendar(!showDropoffCalendar);
    };

    const togglePickupTimetable = () => {
        setShowPickupTimetable(!showPickupTimetable);
    };

    const toggleDropoffTimetable = () => {
        setShowDropoffTimetable(!showDropoffTimetable);
    };

    const handlePickupDateChange = (date) => {
        setPickupDate(date);
    setDropoffDate(date); // Set dropoff date to pickup date initially
    togglePickupCalendar();
    };

    const handleDropoffDateChange = (date) => {
        setDropoffDate(date);
        toggleDropoffCalendar();
    };

    const handlePickupTimeChange = (time) => {
        setPickupTime(time);
        togglePickupTimetable();
    };

    const handleDropoffTimeChange = (time) => {
        setDropoffTime(time);
        toggleDropoffTimetable();
    };


    const [pickupInput, setPickupInput] = useState("");
    const [pickupFilteredResults, setPickupFilteredResults] = useState([]);
    const [dropoffInput, setDropoffInput] = useState("");
    const [dropoffFilteredResults, setDropoffFilteredResults] = useState([]);

    const [pickupError, setPickupError] = useState(""); // Pickup location error message
    const [dropoffError, setDropoffError] = useState(""); // Dropoff location error message
    const [timeGapError, setTimeGapError] = useState(""); // Time gap error message

    // Function to fetch data based on input value
    const fetchDate = (value, setterFunction, setFilteredResultsFunction) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                const filteredResults = json.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.name &&
                        user.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setFilteredResultsFunction(filteredResults);
            });
    };

    
    const handleInputChange = (value, setterFunction, setFilteredResultsFunction) => {
        const lowercaseValue = value.toLowerCase();
        setterFunction(lowercaseValue);
        if (lowercaseValue.trim() === "") {
            setFilteredResultsFunction([]);
            return;
        }
        fetchDate(lowercaseValue, setterFunction, setFilteredResultsFunction);
    };

    // Function to handle click on suggestion
    const handleSuggestionClick = (value, setterFunction, setFilteredResultsFunction) => {
        setterFunction(value);
        setFilteredResultsFunction([]);
    };

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for empty pickup location
        if (pickupInput.trim() === "") {
            setPickupError("Pickup location cannot be empty");
            return;
        } else {
            setPickupError(""); // Clear pickup location error
        }

        // Check for empty dropoff location
        if (dropoffInput.trim() === "") {
            setDropoffError("Dropoff location cannot be empty");
            return;
        } else {
            setDropoffError(""); // Clear dropoff location error
        }

        // Check for matching pickup and dropoff times and dates
        const pickupDateTime = new Date(`${pickupDate.toDateString()} ${pickupTime}`);
        const dropoffDateTime = new Date(`${dropoffDate.toDateString()} ${dropoffTime}`);

        if (pickupDateTime >= dropoffDateTime) {
            setTimeGapError("Dropoff time must be later than pickup time");
            return;
        } else {
            setTimeGapError(""); // Clear time gap error
        }

        const timeDifference = Math.abs(dropoffDateTime - pickupDateTime) / (1000 * 60 * 60); // Difference in hours

        if (timeDifference < 1) {
            setTimeGapError("There must be atleast one hour between pickup and dropoff");
            return;
        } else {
            setTimeGapError(""); // Clear time gap error
        }

        axios.post('http://localhost:3001/home', { Location: pickupInput })
            .then(result => {
                console.log(result);
                if (result.data) {
                    setResults(result.data);
                    navigate('/cars');
                } else {
                    console.log("No cars found for the specified location");
                }
            })
            .catch(err => console.log(err));
    };



    return (
        
    <div className="main">
        
            <div className="search_main" style={{marginTop:"50px"}}>
                
                <h1 style={{maxWidth:"1200px", margin:"auto"}} >Car hire for any kind of trip</h1>
                <p style={{marginTop:"-20px",marginBottom:"40px", margin:"auto",maxWidth:"1200px"}}>Great deals at great prices</p>
                <div className="search">
                <input
                        type="text"
                        placeholder="Pick up location"
                        className="input"
                        value={pickupInput}
                        onChange={(e) => handleInputChange(e.target.value, setPickupInput, setPickupFilteredResults)}
                    />
                    {pickupError && <p className="pickup_error-message">{pickupError}</p>}
                    {pickupFilteredResults.length > 0 && (
                        <ul className="pickup_suggestions">
                            {pickupFilteredResults.map((user, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(user.name, setPickupInput, setPickupFilteredResults)}>
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <input
                        type="text"
                        placeholder="Drop off location"
                        className="input"
                        value={dropoffInput}
                        onChange={(e) => handleInputChange(e.target.value, setDropoffInput, setDropoffFilteredResults)}
                    />
                    {dropoffError && <p className="dropoff_error-message">{dropoffError}</p>}
                    {dropoffFilteredResults.length > 0 && (
                        <ul className="dropoff_suggestions">
                            {dropoffFilteredResults.map((user, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(user.name, setDropoffInput, setDropoffFilteredResults)}>
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    

                    <div style={{ position: 'relative' }} className="pickup">
                        <button onClick={togglePickupCalendar} className="button pickupdate">
                        <p style={{ margin: "auto 0", marginTop: "8px" , fontSize:"9px"}}>Pickup date</p>
                            <h4 style={{ margin: "auto 0", marginTop: "14px" }}>{pickupDate.toLocaleDateString()}</h4>
                        </button>
                        {showPickupCalendar && (
                            <div className="calendarContainer">
                                 <Calendar
                                    onChange={handlePickupDateChange}
                                    value={pickupDate}
                                    minDate={currentDate}
                                />
                            </div>
                        )}
                        
                        <button onClick={togglePickupTimetable} className="button pickuptime">
                        <p style={{ margin: "auto 0", marginTop: "8px" , fontSize:"9px"}}>Pickup time</p>
                            <h4 style={{ margin: "auto 0", marginTop: "14px" }}>{pickupTime}</h4>
                        </button>
                        {showPickupTimetable && (
                            <div className="dropdown">
                                {times.map((time, index) => (
                                    <div key={index} onClick={() => handlePickupTimeChange(time)}>
                                        {time}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div style={{ position: 'relative' }} className="dropoff">
                        <button onClick={toggleDropoffCalendar} className="button dropoffdate">
                        <p style={{ margin: "auto 0", marginTop: "8px" , fontSize:"9px"}}>Dropoff date</p>
                            <h4 style={{ margin: "auto 0", marginTop: "14px" }}>{dropoffDate.toLocaleDateString()}</h4>
                        </button>
                        {showDropoffCalendar && (
                            <div className="calendarContainer">
                                <Calendar
                                    onChange={handleDropoffDateChange}
                                    value={dropoffDate}
                                    minDate={pickupDate}
                                />
                            </div>
                        )}

                       <button onClick={toggleDropoffTimetable} className="button dropofftime">
                        <p style={{ margin: "auto 0", marginTop: "8px" , fontSize:"8px"}}>Dropoff time</p>
                            <h4 style={{ margin: "auto 0", marginTop: "14px" }}>{dropoffTime}</h4>

                        </button>
                        {showDropoffTimetable && (
                            <div className="dropdown">
                                {times.map((time, index) => (
                                    <div key={index} onClick={() => handleDropoffTimeChange(time)}>
                                        {time}
                                    </div>
                                ))}
                            </div>
                        )}
                        {timeGapError && <p className="timegap_error-message">{timeGapError}</p>}
                    </div>
                    
                    <button className="search_button" onClick={handleSubmit}>
                        Search
                        
                    </button>
                </div>
            </div>

            <div className="guide_main">
            <div className="guide">
                <h3>How it works</h3>
                <div className="content">
                    <div>
                        
                        <img src={logo1} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Pickup and Dropoff</h3>
                        <p style={{margin:"0 0 0 11px"}}>Select the pickup and dropoff<br />
                           point according to your ease.
                           </p>
                        
                        
                    </div>
                    <div>
                    <img src={logo2} alt="" className="img" />
                    <h3 style={{margin:"-10px 0px 0px 11px"}}>Select the best car</h3>
                        <p style={{margin:"0 0 0 11px"}}>Select the best car that matches<br />
                        your criteria.
                           </p>
                    </div>
                    <div>
                        <img src={logo} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Book and Pay</h3>
                        <p style={{margin:"0 0 0 11px"}}>Pick your favourite car,time <br />
                           and place.
                        </p>
                    </div>
                    <div>
                    <img src={logo3} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Enjoy your ride</h3>
                        <p style={{margin:"0 0 0 11px"}}>Enjoy your ride to the fullest<br />
                           with vroom cars.
                        </p>
                    </div>
                </div>
            </div>
            </div>
            </div>
        
        
    );
}

// Add prop types validation
Home.propTypes = {
    setResults: PropTypes.func.isRequired,// Ensure results is an array and required
    results: PropTypes.array.isRequired, 
  };
export default Home;





