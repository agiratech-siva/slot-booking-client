import { config } from "dotenv";
config();

async function sendTeamAcceptRejectNotification(employeeId,id, status,teamname){
    try{
        const response = await fetch(`${process.env.ENV_URL}/team/teamacceptnotification/${employeeId}/${id}/${status}/${teamname}`);
        console.log("finished fetch");
        console.log(response);
    }catch(err){
        console.log(err);
    }
    
}


export default sendTeamAcceptRejectNotification;