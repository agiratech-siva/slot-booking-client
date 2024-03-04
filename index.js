import React from "react";
import  ReactDOM  from "react-dom/client";
import Home from "./components/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("container"));

let isLoggedIn = false;

if(localStorage.getItem("employee-id")){
    isLoggedIn = true;
}


const approutes = createBrowserRouter([
    {
        path : "/",
        element : <Home data={isLoggedIn} />,
        
    },
    
]);
root.render(<RouterProvider router = {approutes} />);





