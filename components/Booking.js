
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Booking = () => {
    const location =  useLocation();
    const data = location.state;
    
    useEffect(() => {

        const checkforavailability = async() => {
            const response = await fetch(`${process.env.ENV_URL}/booking`, {
                method: "post",
                headers: {
                   "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    hour: data.data.hour == 12 ? 12: data.data.hour + 12,
                    minutes: data.data.minutes,
                    initiator: data.initiator,
                    otherteammember: data.otherteammember,
                    opponent1: data.opponent1,
                    opponent2: data.opponent2
                })
            })
        }

        checkforavailability();
    },[])

    return (
        <h1>hii</h1>
    )

}


export default Booking;