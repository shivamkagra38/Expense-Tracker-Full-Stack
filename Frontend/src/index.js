import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";


const mainRoot = ReactDOM.createRoot(document.getElementById("root"));

//Routing configguration
const routerConfig = createBrowserRouter([

    {
        path: "/",
        element:"Home component to be rendered here.",
        errorElement: "Invalid route"
    },
    {
        path: "/login",
        element: "Login component"
    },
    {
        path: "/signup",
        element: "signup component"
    }

]);

//Rendering...
mainRoot.render(<RouterProvider router={routerConfig} />);