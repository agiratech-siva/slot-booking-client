import { useEffect, useState } from "react";
import { config } from "dotenv";
import { Link } from "react-router-dom";
const id = localStorage.getItem("employee-id");
config();

const Userinfo = () => {
    const [userdetails, setuserdetails] = useState("");
    useEffect( () => {
        const getUserdetails = async () => {
            try{

                const response = await fetch(`${process.env.ENV_URL}/users/getUserdetails/${id}`);

                const finalresponse = await response.json();
                if(response.ok){
                    setuserdetails(finalresponse);
                }else{
                    throw new error("some error occurred");
                }
            }catch (err) {
                
            }
            
        }

        getUserdetails();
        
    },[])

    if(userdetails === ""){
        return (
            <h1>loading....</h1>
        )
    }

    else{
        console.log(userdetails);
        return (
           <div id="usercontainer">
                <div>{userdetails.userdetail.fullname}</div>
                <div>{userdetails.userdetail.employeeId}</div>
                <div>{userdetails.userdetail.phoneNumber}</div>
                <div>{userdetails.userdetail.mail}</div>
                <Link to="/create-team">create team </Link>
                <Link to="/yourteamrequests"> your team requests</Link>
           </div>
        )
        
    }

}


export default Userinfo;