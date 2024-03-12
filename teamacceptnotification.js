import { config } from "dotenv";
config();

async function sendTeamAcceptRejectNotification(employeeId,id, status,teamname){
    try{
        const response = await fetch(`${process.env.ENV_URL}/teams/teamacceptnotification/${employeeId}/${id}/${status}/${teamname}`,{
            method: "post"
        });
        console.log("finished fetch");
        console.log(response);
    }catch(err){
        console.log(err);
    }
    
}


export default sendTeamAcceptRejectNotification;