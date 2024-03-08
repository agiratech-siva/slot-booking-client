import { config } from "dotenv";
config();

const status = async (employeeId,teamNotificationId,status,teamname) => {
    try{
        const response = await fetch(`${process.env.ENV_URL}/teamacceptnotification/${employeeId}/${teamNotificationId}/${status}/${teamname}`);
    }
    catch(err){
        console.log(err);
    }
}

export default status;