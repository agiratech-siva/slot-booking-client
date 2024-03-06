import { useEffect, useState } from "react";
import Teamuser from "./Teamuser";

const Listusers = () => {
    const id = localStorage.getItem("employee-id");
    const [listusers, setListUsers] = useState([]);

    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`https://slot-booking-server.onrender.com/listusersforteam/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setListUsers(data.userslist);
                } else {
                    throw new Error(data.message || 'Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    },[])


    if(listusers.length == 0){
        return <h1>loading.....</h1>
    }
    else{
        return (
            listusers.map(user => <Teamuser key={user.employeeId} data = {user} />)
        )
    }
}


export default Listusers;