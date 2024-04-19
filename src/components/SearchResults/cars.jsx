import Filter from "./filter";
import Listing from "./listing";



export default function cars(){

    const styles = {

          submain:{
             
            display:"flex",
            flexDirection:"row",
            width:"100%"
          },

          filter:{
             
            flex:"0.3",
         
          },

          listing:{
            flex:"1.5"
          }
    }

    return (
      
        <div className="main">
             
             <div className="submain" style={styles.submain}>
             <div className="filter" style={styles.filter}>
             <Filter/>
             </div>
             <div className="listing" style={styles.listing}>
             <Listing/>
             </div>
             </div>  
        </div>

        


    )
}