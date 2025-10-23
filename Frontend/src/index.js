import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "../components/Home.js";
import Login from "../components/Login.js";
import Signup from "../components/Signup.js";
import { Toaster } from "../components/ui/sonner.js";

const mainRoot = ReactDOM.createRoot(document.getElementById("root"));

//Routing configguration
const routerConfig = createBrowserRouter([

    {
        path: "/",
        element: <Home />,
        errorElement: "Invalid route"
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }

]);

const App = () => {

    return (
        <div>
           <Toaster position="top-center" richColors />
            <RouterProvider router={routerConfig} />
        </div>
    );

}

//Rendering...
mainRoot.render(<App />);