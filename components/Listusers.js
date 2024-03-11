import { useEffect, useState } from "react";
import Teamuser from "./Teamuser";
import { config } from "dotenv";
import { Link } from "react-router-dom";

config();

const Listusers = () => {
    const id = localStorage.getItem("employee-id");
    const [listusers, setListUsers] = useState([]);
    const [empty, setEmpty] = useState(false);
    useEffect(() => {

        const fetchUserDetails = async () => {
            try {

                const response = await fetch(`${process.env.ENV_URL}/users/listusersforteam/${id}`);

                const data = await response.json();

                if (response.ok) {
                    setListUsers(data.userslist);
                } else {
                    setListUsers([]);
                    setEmpty(true);
                }
            } catch (error) {
                
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    },[])

    
    if(listusers.length == 0 && empty == false){
        return <h1>loading.....</h1>
    }else if(listusers.length == 0 && empty == true){
        return <p>no users are left to make a team with you..</p>
    }
    else{
        return (
            <>
                <Link to="/">Home page</Link>
                {listusers.map(user => <Teamuser key={user.employeeId} data = {user} />)}
            </>

            
        )
    }
}


export default Listusers;