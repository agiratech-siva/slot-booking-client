import { useEffect, useState } from "react";

const id = localStorage.getItem("employee-id");


const Userinfo = () => {
    const [userdetail, setuserdetail] = useState("");
    useEffect(async () => {
        const response = await fetch(`https://slot-booking-server.onrender.com/getUserdetails/${id}`);
        const finalresponse = await response.json();
        setuserdetail(finalresponse);
    },[])

    if(userdetail === ""){
        return (
            <h1>loading....</h1>
        )
    }

    else{
        return (
           <div id="usercontainer">
                <div>{userdetail.fullname}</div>
                <div>{userdetail.employeeId}</div>
                <div>{userdetail.phoneNumber}</div>
                <div>{userdetail.mail}</div>
           </div>
        )
        
    }

}


export default Userinfo;