

const status = async (employeeId,teamNotificationId,status,teamname) => {
    try{
        const response = await fetch(`https://slot-booking-server.onrender.com/teamacceptnotification/${employeeId}/${teamNotificationId}/${status}/${teamname}`);
    }
    catch(err){
        console.log(err);
    }
}

export default status;