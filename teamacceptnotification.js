async function archiveEmail(employeeId,id, status){
    
    const response = await fetch(`http://localhost:8000/teamacceptnotification/${employeeId}/${id}/${status}`);
    console.log("finished fetch");
    console.log(response);
}


export default archiveEmail;