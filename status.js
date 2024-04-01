import { config } from "dotenv";
config();

const status = async (employeeId,teamNotificationId,status,teamname) => {
    try{
        
        const response = await fetch(`${process.env.ENV_URL}/teams/teamacceptnotification/${employeeId}/${teamNotificationId}/${status}/${teamname}`,{
            method: "post"
        });
        
        const result = await response.json();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

export default status;