import React from "react";
import  ReactDOM  from "react-dom/client";
import Home from "./components/Home";
import Listusers from "./components/Listusers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Userinfo from "./components/Userinfo";

const root = ReactDOM.createRoot(document.getElementById("container"));

let isLoggedIn = false;

if(localStorage.getItem("employee-id")){
    isLoggedIn = true;
}

navigator.serviceWorker.register(
    new URL('./firebase-messaging-sw.js', import.meta.url),
    {type: 'module'}
);

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
            }
        ]
        
    },
    
]);
root.render(<RouterProvider router = {approutes} />);





