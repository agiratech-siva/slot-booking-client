import { useEffect, useState } from "react";

const id = localStorage.getItem("employee-id");
import status from "../status";

const Teamrequests = () => {
    let [count, setCount] = useState(0);
    const [requests,setRequests] = useState([]);
    
    useEffect(() => {
        console.log("useEffect called");
        const getteamrequests = async () => {
            const response = await fetch(`http://localhost:8000/getteamrequests/${id}`);
            const data = await response.json();
            
            if(data.data.length == 0){
                return setRequests([]);
            }
            setRequests(data?.data[0].teamRequests);
        }

        getteamrequests()

    },[count])

    if(requests.length == 0){
        return (
            <p>no entries found</p>
        )
    }else{
        console.log("requests",requests);
        return (
            requests.map(request => {
                return (
                    <div id="individualrequestcontainer" key={request.teamNotificationId}>
                        <p>{request.senderDetails.fullname}</p>
                        <p>{request.senderDetails.mail}</p>
                        <p>teamname: {request.teamName}</p>
                        <button onClick={async () => {
                            await status(id, request.teamNotificationId,"true", request.teamName);
                            setCount(count++);
                        }}>Accept</button>
                        <button onClick={async () => {
                            await status(id, request.teamNotificationId,"false",request.teamName);
                            setCount(count++);
                        }}>Decline</button>
                    </div>
                );
            })
            
       )
    }
    
}

export default Teamrequests;