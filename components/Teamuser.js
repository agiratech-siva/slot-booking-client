import { Link } from "react-router-dom";

const Teamuser = ({data}) => {
        
        const sendNotifications = async (id) => {
            try{
                const response = await fetch(`https://slot-booking-server.onrender.com/sendJoinTeamNotification/${id}`);
                const data = await response.json();
                console.log(data);
                
            }catch(err){
                console.log(err);
            }
            
        }
        return (
            <div className="teamuser">
                <h1>{data.fullname}</h1>
                <button onClick={() => {
                    console.log(data.employeeId);
                    sendNotifications(data.employeeId);
                }
                }><Link to="">give request to be a part of team member</Link></button>
                <h2>{data.mail}</h2>
            </div>
        )
        
    
}

export default Teamuser;