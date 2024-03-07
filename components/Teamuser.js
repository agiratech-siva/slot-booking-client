
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const senderId = localStorage.getItem("employee-id");

const Teamuser = ({ data }) => {
    
    
    const sendNotifications = async (id) => {

        try {
            
            const response = await fetch(
                `http://localhost:8000/sendJoinTeamNotification/${id}/${senderId}`
            );
            const result = await response.json();
            console.log(result);

            
        } catch (err) {
            console.log(err);
        }
  };
  return (
    <div className="teamuser">
      <h1>{data.fullname}</h1>
      <h2>{data.employeeId}</h2>
      
        <button onClick={() => sendNotifications(data.employeeId)}>
          <a href="http://www.google.com" target="_blank">give request to be a part of team member</a>
        </button>
      
      <h2>{data.mail}</h2>
    </div>
  );
};

export default Teamuser;
