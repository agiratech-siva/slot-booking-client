import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage} from "firebase/messaging/sw";
import firebaseconfig from "./utils/firebase-config";

const firebaseApp = initializeApp(firebaseconfig);

const messaging = getMessaging(firebaseApp);

async function archiveEmail(id, status){
  console.log("notifcation id ", id);
  const response = await fetch(`https://slot-booking-server.onrender.com/teamacceptnotification/${id}/${status}`);
  console.log("finished fetch");
  console.log(response);
}

onBackgroundMessage(messaging, (payload) => {
  self.addEventListener(
    "notificationclick",
    (event) => {
      event.notification.close();
      if (event.action === "accept") {
        archiveEmail(payload?.data?.notificationRequestId,"true");
      } else {
        archiveEmail(payload?.data?.notificationRequestId, "false")
        clients.openWindow("/");
      }
    },
    false,
  );


    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'team member application invite';
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/firebase-logo.png',
      actions: [
        {
          action: "accept",
          title: "accept the request",
        }
      ]
    };

    
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);

    
});
