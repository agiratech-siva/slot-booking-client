import React from "react";
import  ReactDOM  from "react-dom/client";
import Home from "./components/Home";
import Listusers from "./components/Listusers";
import requestNotifcationPermission from "./notifications/firebase";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Userinfo from "./components/Userinfo";
import Teamrequests from "./components/Teamrequests";

const root = ReactDOM.createRoot(document.getElementById("container"));

let isLoggedIn = false;

navigator.serviceWorker.register(
    new URL('./firebase-messaging-sw.js', import.meta.url),
    {type: 'module', scope: '/'}
);


if(localStorage.getItem("employee-id")){
    isLoggedIn = true;
    requestNotifcationPermission();
}



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
            }
        ]
        
    },
    
]);
root.render(<RouterProvider router = {approutes} />);





