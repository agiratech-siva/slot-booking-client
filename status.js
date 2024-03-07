

const status = async (employeeId,teamNotificationId,status) => {
    try{
        const response = await fetch(`http://localhost:8000/teamacceptnotification/${employeeId}/${teamNotificationId}/${status}`);
    }
    catch(err){
        console.log(err);
    }
}

export default status;