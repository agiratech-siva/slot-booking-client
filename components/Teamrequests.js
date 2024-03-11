import { useEffect, useState } from "react";
import { config } from "dotenv";
config();
const id = localStorage.getItem("employee-id");
import status from "../status";
import { Link } from "react-router-dom";

const Teamrequests = () => {
    
    const [requests,setRequests] = useState([]);
    
    useEffect(() => {
        console.log("useEffect called");

        const getteamrequests = async () => {

            const response = await fetch(`${process.env.ENV_URL}/team/getteamrequests/${id}`);

            const data = await response.json();
            console.log(data);
            
            if(data.data.teamRequests.length == 0){
                return setRequests([]);
            }

            setRequests(data?.data.teamRequests);
        }

        getteamrequests()

    },[])

    if(requests.length == 0){
        return (
            <p>no entries found</p>
        )
    }else{
        console.log("requests",requests);
        return (
            <>
                <Link to="/">Home page</Link>
                {requests.map(request => {
                    return (
                        <div id="individualrequestcontainer" key={request.teamNotificationId}>
                            <p>{request.senderDetails.fullname}</p>
                            <p>{request.senderDetails.mail}</p>
                            <p>teamname: {request.teamName}</p>
                            <button onClick={async () => {
                                await status(id, request.teamNotificationId,"true", request.teamName);
                                
                            }}>Accept</button>
                            <button onClick={async () => {
                                await status(id, request.teamNotificationId,"false",request.teamName);
                                
                            }}>Decline</button>
                        </div>
                    );
                })}
            </>
            
       )
    }
    
}

export default Teamrequests;