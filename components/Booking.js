
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(`${process.env.ENV_URL}`);

let socketId;
socket.on("connect", () => {
    console.log(socket.id); 
    socketId = socket.id;
});


const Booking = () => {
    const location =  useLocation();
    const data = location.state;
    console.log(data);
    const [bookingStatus, setBookingStatus] = useState({});
    const [bookingAccepted, setBookingAccepted] = useState();

    socket.on(`booking-status-${socketId}`, (currentStatus) => {
       if(currentStatus.isBooked === true){
        setBookingAccepted("true");
       }else if (currentStatus.isBooked === false){
        setBookingAccepted("false");
       }
        setBookingStatus(currentStatus?.response);
    })
    
    useEffect(() => {

        const checkforavailability = async() => {

            try{
                const response = await fetch(`${process.env.ENV_URL}/booking`, {
                    method: "post",
                    headers: {
                       "Content-Type": "application/json"
                    },
    
                    body: JSON.stringify({
                        hour: data.data.hour <= 10 ? data.data.hour + 12 : data.data.hour,
                        minutes: data.data.minutes,
                        initiator: data.initiator,
                        otherteammember: data.otherteammember,
                        opponent1: data.opponent1,
                        opponent2: data.opponent2,
                        myteamname: data.myteamname,
                        opponentteamname : data.opponentteamname
                    })
                })
                if(response.status == 409){
                    return setBookingStatus("slot is blocked");
                }
                setBookingStatus(data);
            }catch(err){
                console.log(err);
                
            }
            
        }
        checkforavailability();
    },[])
    
    if(Object.keys(bookingStatus).length == 0){
        return <h1>loading</h1>
    }

    if(typeof bookingStatus == 'string'){
        return <h1>{bookingStatus}</h1>
    }

    if(bookingAccepted == "true"){
        return <h1>your slot is booked successfully</h1>
    }

    if(bookingAccepted == "false"){
        return <h1>someone declined your slot booking request...</h1>
    }
    {console.log(bookingStatus, typeof bookingStatus, bookingStatus.otherteammember)}
    return (
        
        <>
            <p>{data.data.hour}:{data.data.minutes}</p>
            <p>yourteammember: {bookingStatus.otherteammember.name} status: {bookingStatus.otherteammember.status == "accepted" ? "true" : "false"}</p>
            <p>opponent1: {bookingStatus.opponent1.name} status: {bookingStatus.opponent1.status =="accepted" ? "true" : "false"}</p>
            <p>opponent2: {bookingStatus.opponent2.name} status: {bookingStatus.opponent2.status == "accepted" ? "true" : "false"}</p>
        </>
        
    )

}

export default Booking;