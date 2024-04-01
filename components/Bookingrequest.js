import { useEffect,useState } from "react";
import bookingRequestStatus from "../bookingrequestStatus";
const id = localStorage.getItem("employee-id");


const Bookingrequest = () => {
    let role = "";
    const [bookingrequests, setBookingRequests] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {

        const getBookingRequests = async () => {
            const response = await fetch(`${process.env.ENV_URL}/booking/getbookingrequests/${id}`);
            const data = await response.json();
            console.log(data, Array.isArray(data));
            if(data.response.length == 0){
                setBookingRequests(data.response);
                setIsEmpty(true);
                return;
            }
            setBookingRequests(data?.response);
        }
        getBookingRequests();
    },[])

    if(bookingrequests.length == 0 && isEmpty == false){
        return <p>loading</p>
    }
    else if (bookingrequests.length == 0 && isEmpty == true){
        return <p>your booking request is empty</p>
    }
    
    return (
        
        <>
            {bookingrequests.map((request) => (
                <>
                    <p>{request.bookingId}</p>
                    <p>{request.objectId.Date}</p>
                    <p>Time: {request.objectId.hour} : {request.objectId.time}</p>
                    <p>team{request.objectId.myteamname} vs team{request.objectId.opponentteamname}</p>
                    <div>
                        <p>team{request.objectId.myteamname} members</p>
                        <p>{request.objectId.Initiator.name}</p>
                        <p>{request.objectId.otherteammember.name}</p>
                    </div>
                    <div>
                        <p>team{request.objectId.opponentteamname} members</p>
                        <p>{request.objectId.opponent1.name}</p>
                        <p>{request.objectId.opponent2.name}</p>
                    </div>

                    <button onClick={() => {
                        if(request.objectId.otherteammember.employee-id == id){
                            role = "otherteammember";
                        }
                        else if(request.objectId.opponent1.employee-id == id){
                            role= "opponent1";
                        }else{
                            role = "opponent2";
                        }
                        bookingRequestStatus(role, "accepted",request.bookingId,id);

                    }}>Accept</button>
                    <button onClick={() => {
                        if(request.objectId.otherteammember["employee-id"] == id){
                            role = "otherteammember";
                        }
                        else if(request.objectId.opponent1["employee-id"] == id){
                            role= "opponent1";
                        }else{
                            role = "opponent2";
                        }

                        bookingRequestStatus(role, "declined",request.bookingId, id);
                    }}>Decline</button>

                </>
                
            ))}
        </>
    )
}


export default Bookingrequest