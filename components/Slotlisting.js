import { useEffect, useState } from "react";
import Slotarea from "./Slotarea";
import { Link } from "react-router-dom";


const Slotlisting = () => {
    const [timeout, setTimeout] = useState(false);
    const [list,setList] = useState([]);

    useEffect(() => {

        const getSlotList = async () => {
            const response = await fetch(`${process.env.ENV_URL}/slots/getSlotDataForDifferentTime`);

            const result = await response.json();

            if(!response.ok){
                setTimeout(true);
            }
            
            setList(result.response);
            
        }

        getSlotList();

    },[])

    if(timeout == true){
        return (
            <>  
                <Link to="/">Home</Link>
                <p>today's time is out, come back tmrw for booking..</p>
            </>
        )
    }

    
    return (
        
        <>
            <Link to="/">Home</Link>

            {Object.keys(list).map((key) => (
                
                list[key].length !== 0 && (
                    <div>
                        <h1>{key % 12 ==0 ? 12 : key % 12} o clock</h1>
                        <Slotarea data={{ timing: list[key], hour: key }} />
                    </div>
                )
            ))}
        </>

        
          
    )
}

export default Slotlisting;