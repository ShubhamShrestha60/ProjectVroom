import React from 'react';


export default function filter() {

    const styles = {
        
        filter_Main:{
            
            display:"grid",
            gridTemplateRows:"1fr 1fr 1fr",
            height:"600px",
            // width:"20%",
            // marginTop:"100px",
            borderRight:"3px solid black",
            color:"black",
            backgroundColor:"white"

        },

        segments:{
            // backgroundColor:"yellow"
        },

        fuel_type:{
            // backgroundColor:"green"
        },

        car_type:{
            // backgroundColor:"cadetblue"
        },
        input:{
            margin: "4px 0 0",
           lineHeight: "normal",
            width: "20px",
            height: "20px",
        },
        label:{
           
            fontSize:"19px",
            color:"white"
        },
        segmentsh3:{
            color:"red"
        }
    
    }
    return (
        <div className='filter_Main' style={styles.filter_Main}>

            <section className='segments' style={styles.segments}>
                
            <h3 style={{color:"black",paddingLeft:"3vw",borderBottom:"2px solid black",paddingBottom:"10px"}}>Segments</h3>
            <input type="checkbox" name="" id=""  style={{marginLeft:"3vw"}} /> <label htmlFor="">Hatchback</label> <br />
            <input type="checkbox" name="" id=""  style={{marginLeft:"3vw"}} /> <label htmlFor="">Seden</label><br />
            <input type="checkbox" name="" id=""  style={{marginLeft:"3vw"}} /> <label htmlFor="">Hatchback</label>

            </section>

            <section className='fuel_type' style={styles.fuel_type}>
              
            <h3 style={{color:"black",paddingLeft:"3vw",borderBottom:"2px solid black",paddingBottom:"10px"}}>Fuel</h3>
            <input type="checkbox" name="" id=""  style={{marginLeft:"3vw"}} /> <label htmlFor="">Petrol</label> <br />
            <input type="checkbox" name="" id=""  style={{marginLeft:"3vw"}} /> <label htmlFor="">Diesel</label><br />
            
            </section>

            <section className='car_type' style={styles.car_type}>
              
            <h3 style={{color:"black",paddingLeft:"3vw",borderBottom:"2px solid black",paddingBottom:"10px"}}>Transistion</h3>
            <input type="checkbox" name="" id=""  style={{marginLeft:"3vw"}} /> <label htmlFor="">Hatchback</label> <br />
            <input type="checkbox" name="" id=""  style={{marginLeft:"3vw"}} /> <label htmlFor="">Seden</label><br />
            <input type="checkbox" name="" id=""  style={{marginLeft:"3vw"}} /> <label htmlFor="">Hatchback</label>
            </section>


            
        </div>
    );
}
