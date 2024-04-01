import { config } from "dotenv";
config();

const bookingRequestStatus = async (role, status, bookingId,id) => {
    try{
        
        const response = await fetch(`${process.env.ENV_URL}/booking/bookingacceptreject/`,{
            method: "post",
            headers :{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                role: role,
                status: status,
                bookingId: bookingId,
                employeeId: id,
            })
        });
        
        const result = await response.json();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

export default bookingRequestStatus;