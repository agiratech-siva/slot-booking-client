async function archiveEmail(employeeId,id, status,teamname){
    
    const response = await fetch(`https://slot-booking-server.onrender.com/teamacceptnotification/${employeeId}/${id}/${status}/${teamname}`);
    console.log("finished fetch");
    console.log(response);
}


export default archiveEmail;