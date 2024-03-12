import { config } from "dotenv";
import { useState } from "react";
config();

const senderId = localStorage.getItem("employee-id");

const Teamuser = ({ data }) => {
    const [teamName, setTeamName] = useState("");
    
    const sendNotifications = async (e,id) => {

        e.preventDefault();
        try {
            
            const response = await fetch(

                `${process.env.ENV_URL}/teams/sendJoinTeamNotification/${id}/${senderId}/${teamName}`,{
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify({
                    
                  }),
                }

            );
            const result = await response.json();
            console.log(result);
            setTeamName("");

        } catch (err) {
            console.log(err);
        }
  };
  return (
    <div className="teamuser">
      <h1>{data.fullname}</h1>
      
        <form onSubmit={(e) => sendNotifications(e,data.employeeId)}>
          <label htmlFor="teamname">teamname: </label>
          <input id="teamname" type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} required></input>
          <button type="submit">
            give request to be a part of team member
          </button>
        </form>
        
      
      <h2>{data.mail}</h2>
    </div>
  );
};

export default Teamuser;
