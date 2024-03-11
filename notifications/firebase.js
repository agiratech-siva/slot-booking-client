import { config } from "dotenv";
config();
import { initializeApp } from "firebase/app";
import firebaseconfig from "../utils/firebase-config";
import { getMessaging, getToken, onMessage} from "firebase/messaging";
import toastdisplay from "./toast";
import 'react-toastify/dist/ReactToastify.css';

const firebaseApp = initializeApp(firebaseconfig);

const messaging = getMessaging(firebaseApp);

onMessage(messaging, (payload) => {
  toastdisplay(payload);
  console.log('Message received. ', payload);
});

const id = localStorage.getItem("employee-id");
const requestNotifcationPermission = () => {
    if(localStorage.getItem("permission for slot booking") == "true" && localStorage.getItem("registration-token") ){
        return ;
    }

    console.log("notification permission called")
    Notification.requestPermission().then((permission) => {
        if(permission === "granted"){
            console.log("permission granted");
            localStorage.setItem("permission for slot booking", "true");
            getToken(messaging, { vapidKey: process.env.VAPID_KEY }).then((currentToken) => {
              if(currentToken){
                localStorage.setItem("registration-token", currentToken);
              }
              (async function(){
                try{
                  const response = await fetch(`${process.env.ENV_URL}/users/addRegistrationToken/${id}`, {

                    method: "POST",
                    headers : {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      token: currentToken,
                    })
                  })
                  console.log(currentToken);
                }catch(err){
                  console.log(err);
                }
                
              })()
            }).catch((err) => {
              console.log('An error occurred while retrieving token. ', err);
            });
    
        }else{
            console.log("denied");
            localStorage.setItem("permission for slot booking", "false");
            console.log("give notification permission for notifications to receive for you ");
        }
    })
}


export default requestNotifcationPermission;
