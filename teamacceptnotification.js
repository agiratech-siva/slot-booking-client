import { config } from "dotenv";
config();

async function archiveEmail(employeeId,id, status,teamname){

    const response = await fetch(`${process.env.ENV_URL}/teamacceptnotification/${employeeId}/${id}/${status}/${teamname}`);

    console.log("finished fetch");
    console.log(response);
}


export default archiveEmail;