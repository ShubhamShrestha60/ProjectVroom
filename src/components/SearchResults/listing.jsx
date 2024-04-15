export default function listing(){
     

    const styles = {

        listing_main:{
            backgroundColor:"white",
            // width:"80%",
            marginTop:"-20px",
            // marginLeft:"20%",
            // height:"auto"
        }
    }
    return (
          
        <div className="listing_main" style={styles.listing_main}>
         
         <p>21 cars found for you</p>

        </div>

    )
}