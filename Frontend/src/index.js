import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "../components/Home.js";
import Login from "../components/Login.js";
import Signup from "../components/Signup.js";
import { Toaster } from "../components/ui/sonner.js";

import { Provider } from "react-redux";
import store from "./redux/store.js";

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

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
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Toaster position="top-center" richColors />
                    <RouterProvider router={routerConfig} />
                </PersistGate>
            </Provider>
        </div>
    );

}

//Rendering...
mainRoot.render(<App />);