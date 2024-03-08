import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage} from "firebase/messaging/sw";
import firebaseconfig from "./utils/firebase-config";
import archiveEmail from "./teamacceptnotification";
const firebaseApp = initializeApp(firebaseconfig);
const messaging = getMessaging(firebaseApp);


onBackgroundMessage(messaging, (payload) => {
  self.addEventListener(
    "notificationclick",
    async (event) => {
      event.notification.close();
      if (event.action === "accept") {
        await archiveEmail(payload?.data?.receiverId,payload?.data?.notificationRequestId,"true", payload?.data?.teamName);
      } else if(event.action === "decline") {
        await archiveEmail(payload?.data?.receiverId,payload?.data?.notificationRequestId, "false",payload?.data?.teamName);
      }else if(payload.data.type == "information"){
        clients.openWindow("/");
      }else{
        clients.openWindow("/yourteamrequests");
      }
    },
    false,
  );


    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    let notificationOptions;
    if(payload.data.type == "information"){
      notificationOptions = {
        body: payload.data.body,
      }

    }else{
      notificationOptions = {
        body: payload.data.body,
        icon: '/firebase-logo.png',
        actions: [
          {
            action: "accept",
            title: "accept the request",
          },
          {
            action:"decline",
            title: "decline the request",
          }
        ]
      };
    }
    
    self.registration.showNotification(notificationTitle,
      notificationOptions);
});
