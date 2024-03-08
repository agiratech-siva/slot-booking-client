async function archiveEmail(employeeId,id, status,teamname){
    
    const response = await fetch(`http://localhost:8000/teamacceptnotification/${employeeId}/${id}/${status}/${teamname}`);
    console.log("finished fetch");
    console.log(response);
}


export default archiveEmail;