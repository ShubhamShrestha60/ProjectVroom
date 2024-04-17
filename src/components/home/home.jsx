import { useState } from "react";
import Calendar from 'react-calendar';
import logo from "./card.png";
import 'react-calendar/dist/Calendar.css';
import './home.css';
import PropTypes from 'prop-types'; // Import PropTypes

export const Home = ({setResults, results}) => {
    const [pickupDate, setPickupDate] = useState(new Date());
    const [pickupTime, setPickupTime] = useState('12:00');
    const [dropoffDate, setDropoffDate] = useState(new Date());
    const [dropoffTime, setDropoffTime] = useState('12:00');

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

    // Function to fetch data based on input value
    const fetchDistricts = (value, setterFunction, setFilteredResultsFunction) => {
        fetch("https://api-url/districts") // Replace "https://api-url/districts" with the actual API endpoint
            .then((response) => response.json())
            .then((json) => {
                const filteredResults = json.districts.filter((district) => {
                    return (
                        value &&
                        district &&
                        district.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setFilteredResultsFunction(filteredResults);
            });
    };

    // Function to handle input change and fetch suggestions
    const handleInputChange = (value, setterFunction, setFilteredResultsFunction) => {
        setterFunction(value);
        if (value.trim() === "") {
            setFilteredResultsFunction([]);
            return;
        }
        fetchDistricts(value, setterFunction, setFilteredResultsFunction);
    };

    // Function to handle click on suggestion
    const handleSuggestionClick = (value, setterFunction, setFilteredResultsFunction) => {
        setterFunction(value);
        setFilteredResultsFunction([]);
    };

    return (
        <div className="main">
            <div className="search_main">
                <h1 >Car hire for any kind of trip</h1>
                <p style={{marginTop:"-20px",marginBottom:"40px"}}>Great deals at great prices</p>
                <div className="search">
                <input
                        type="text"
                        placeholder="Pick up location"
                        className="input"
                        value={pickupInput}
                        onChange={(e) => handleInputChange(e.target.value, setPickupInput, setPickupFilteredResults)}
                    />
                    {pickupFilteredResults.length > 0 && (
                        <ul className="pickup_suggestions">
                            {pickupFilteredResults.map((district, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(district, setPickupInput, setPickupFilteredResults)}>
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
                    {dropoffFilteredResults.length > 0 && (
                        <ul className="dropoff_suggestions">
                            {dropoffFilteredResults.map((district, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(district, setDropoffInput, setDropoffFilteredResults)}>
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
                                <Calendar onChange={handlePickupDateChange} value={pickupDate} />
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
                                <Calendar onChange={handleDropoffDateChange} value={dropoffDate} />
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
                    </div>

                    <button style={{ backgroundColor: 'maroon', color: 'white' }} className="search_button">
                        Search
                        
                    </button>
                </div>
            </div>
            <div className="guide">
                <h3>How it works</h3>
                <div className="content">
                    <div>
                        <img src={logo} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Book and Pay</h3>
                        <p style={{margin:"0 0 0 11px"}}>Pick your favourite car,time <br />
                           and place.
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
                        <img src={logo} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Book and Pay</h3>
                        <p style={{margin:"0 0 0 11px"}}>Pick your favourite car,time <br />
                           and place.
                        </p>
                    </div>
                    <div>
                    <img src={logo} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Book and Pay</h3>
                        <p style={{margin:"0 0 0 11px"}}>Pick your favourite car,time <br />
                           and place.
                        </p>
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



