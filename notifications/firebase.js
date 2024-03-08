import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import firebaseconfig from "../utils/firebase-config";
import { getMessaging, getToken, onMessage} from "firebase/messaging";
config();

const firebaseApp = initializeApp(firebaseconfig);

const messaging = getMessaging(firebaseApp);

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

const id = localStorage.getItem("employee-id");
const requestNotifcationPermission = () => {
    if(localStorage.getItem("permission for slot booking") == "true"){
        return ;
    }

    console.log("notification permission called");
    Notification.requestPermission().then((permission) => {
        if(permission === "granted"){
            console.log("permission granted");
            localStorage.setItem("permission for slot booking", "true");
            getToken(messaging, { vapidKey: process.env.VAPID_KEY }).then((currentToken) => {
              (async function(){
                const response = await fetch(`https://slot-booking-server.onrender.com/addRegistrationToken/${id}`, {
                  method: "POST",
                  headers : {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    token: currentToken,
                  })
                })
                console.log(currentToken);
              })()
            }).catch((err) => {
              console.log('An error occurred while retrieving token. ', err);
            });
    
        }else{
            console.log("denied");
            localStorage.setItem("permission for slot booking", "false");
            console.log('No registration token available. Request permission to generate one.');
        }
    })
}


export default requestNotifcationPermission;
