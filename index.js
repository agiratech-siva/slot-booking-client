import React from "react";
import  ReactDOM  from "react-dom/client";
import Home from "./components/Home";
import Listusers from "./components/Listusers";
import requestNotifcationPermission from "./notifications/firebase";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Userinfo from "./components/Userinfo";
import Teamrequests from "./components/Teamrequests";
import Slotlisting from "./components/Slotlisting";
import Teamselection from "./components/Teamselection";
import Booking from "./components/Booking";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("container"));

let isLoggedIn = false;

navigator.serviceWorker.register(
    new URL('./firebase-messaging-sw.js', import.meta.url),
    {type: 'module', scope: '/'}
);


if(localStorage.getItem("employee-id")){
    isLoggedIn = true;
    requestNotifcationPermission();
} // In else block implement logout functionality here , because user can delete your employee-id in localstorage.


const approutes = createBrowserRouter([
    {
        path : "/",
        element : <Home data={isLoggedIn} />,
        children: [
            {
                path : "/",
                element : <Userinfo/>
            },
            {
                path: "/create-team",
                element : <Listusers/>
            },
            {
                path: "/yourteamrequests",
                element: <Teamrequests/>
            },
            {
                path: "/slotlist",
                element: <Slotlisting/>
            },
            {
                path: "/teamselection",
                element: <Teamselection/>
            },
            {
                path: "/bookingpage",
                element: <Booking/>
            }
        ]
        
    },
    
]);


root.render(
    <>
        <ToastContainer/>
        <RouterProvider router = {approutes} />
    </>
    
);





