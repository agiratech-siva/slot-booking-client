import { useEffect, useState } from "react";

const id = localStorage.getItem("employee-id");
import status from "../status";

const Teamrequests = () => {

    const [requests,setRequests] = useState([]);
    
    useEffect(() => {
        const getteamrequests = async () => {
            const response = await fetch(`http://localhost:8000/getteamrequests/${id}`);
            const data = await response.json();
            
            if(data.data.length == 0){
                return setRequests([]);
            }
            setRequests(data?.data[0].teamRequests);
        }

        getteamrequests()

    },[])

    if(requests.length == 0){
        return (
            <p>no entries found</p>
        )
    }else{
        console.log(requests);
        return (
            requests.map(request => {
                return (
                    <div id="individualrequestcontainer" key={request.teamNotificationId}>
                        <p>{request.senderDetails.fullname}</p>
                        <p>{request.senderDetails.mail}</p>
                        <button onClick={() => status(id, request.teamNotificationId,"true")}>Accept</button>
                        <button onClick={() => status(id, request.teamNotificationId,"false")}>Decline</button>
                    </div>
                );
            })
            
       )
    }
    
}

export default Teamrequests;