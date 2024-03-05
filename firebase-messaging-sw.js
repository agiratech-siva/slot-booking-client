import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage} from "firebase/messaging/sw";
import { config } from "dotenv";
config()

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCc7r8zBKUy48ZuXNvXZiWe6SM97BL4Pd0",
    authDomain: "slot-booking-e099d.firebaseapp.com",
    projectId: "slot-booking-e099d",
    storageBucket: "slot-booking-e099d.appspot.com",
    messagingSenderId: "70001859991",
    appId: "1:70001859991:web:5afb5aa9fedb139b7a78d2",
    measurementId: "G-Z1X72NWJSR"
  });

const messaging = getMessaging(firebaseApp);

function archiveEmail(){
  console.log("i pressed action buttons and it displayed the corresponding messages");
}

onBackgroundMessage(messaging, (payload) => {
    
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png',
      actions: [
        {
          action: "archive",
          title: "Archive",
        }
      ]
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);

    self.addEventListener(
      "notificationclick",
      (event) => {
        event.notification.close();
        if (event.action === "archive") {
          archiveEmail();
        } else {
          clients.openWindow("/inbox");
        }
      },
      false,
    );

});
