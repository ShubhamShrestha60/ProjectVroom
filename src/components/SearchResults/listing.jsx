import React from "react";
import { Link } from "react-router-dom";

const listing = ({ results }) => {
    const carCount = results.length;


    const styles = {
           main:{
            backgroundColor:"white",
            color:"black",
            minWidth:"750px"
           },
           carDetail:{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            width: "80%",
            border: "3px solid white",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
            margin:"20px 0px 0 20px",
            height:"120px"
        

           },
           img:{
            flex:"0.2",
            width:"170px",
            height:"120px"
           },
           first:{
            flex:"0.5"
           },
           second:{
            flex:"0.5",
            textAlign:"right",
            marginRight:"20px"
           },

           hero:{
            display:"grid",
            gridTemplateRows:"1fr",
            marginTop:"-100px"
            
            
           }
        
    }
    return (
        <div className="main" style={styles.main}>
          
            <p style={{margin:"40px 0 0 20px"}}>
              <span>{carCount}</span> Cars found
            </p>
    
          {carCount > 0 ? (
            <div className="hero">
              {results.map((car) => (
                <div key={car.id} className="carDetail" style={styles.carDetail}>
                  <img style={styles.img} src={car.ImageLocation} alt={`Image of ${car.Brand}`} />
                  <div className="first" style={styles.first}>
                    <h4>Brand: {car.Brand}</h4>
                     <p>Fuel Type: {car.FuelType}</p> <p style={{marginTop:"-10px"}}>Transistion Type: {car.TransistionType}</p>
                  </div>

                  <div className="second" style={styles.second}>
                  <h3> Rs {car.Price}</h3>
                  <h4><Link to="">View Detail</Link></h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      );
    };

export default listing;