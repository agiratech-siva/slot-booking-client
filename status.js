

const status = async (employeeId,teamNotificationId,status,teamname) => {
    try{
        const response = await fetch(`http://localhost:8000/teamacceptnotification/${employeeId}/${teamNotificationId}/${status}/${teamname}`);
    }
    catch(err){
        console.log(err);
    }
}

export default status;