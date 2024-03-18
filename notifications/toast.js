
import { toast,Bounce } from 'react-toastify';
import status from '../status';
const employeeId = localStorage.getItem("employee-id");

const TeamAcceptRejectToast = ({name}) => {
    return (
        <>
            <div> {name?.data?.sendername} sent u the team invitation</div>
            <div> teamName: {name?.data?.teamName}</div>
            <button onClick={() => status(employeeId,name?.data?.notificationRequestId,"true",name?.data?.teamName) }>Accept</button>
            <button onClick={() => status(employeeId,name?.data?.notificationRequestId,"false",name?.data?.teamName) }>Decline</button>
        </>
    )
}

const TeamInvitationStatus = ({name}) => {
    console.log(name);
    return (
        <>
            <div> {name?.data?.senderName} {name?.data?.status} the team invitation</div>
        </>
    )
}
const toastObject =  {
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    }

function toastdisplay(payload){
    if(payload?.data?.type == "information" && payload?.data?.status == "accepted"){
        toast.success(<TeamInvitationStatus name={payload} />, toastObject);
    }else if (payload?.data?.type == "information" && payload?.data?.status == "rejected"){
        toast.error(<TeamInvitationStatus name={payload} />, toastObject)
    }else{
        toast.info(<TeamAcceptRejectToast name= {payload}/> , toastObject);
    }
    
}

export default toastdisplay;

