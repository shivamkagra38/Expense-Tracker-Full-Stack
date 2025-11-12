import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from "./ui/input";
import { Button } from './ui/button';

import Logo from './Logo.js';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from "sonner";
import { useDispatch } from 'react-redux';
import { setAuthUser } from "../src/redux/authSlice.js";

const Login = () => {

    const [userData, setUserData] = useState({email:"", password:""});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Handling user input
    const inputHandler = (e) => {
        setUserData({...userData, [e.target.name]:e.target.value});
    }

    //Handling submission request
    const submitHandler = async (e) => {

        //Preventing submission
        e.preventDefault();

        const{email, password} = userData;

        try
        {
            if(email.length == 0 || password.length == 0)
            {
                toast.warning("All fields are mandatory !");
                return;
            }

            toast.info('Logging you in...');
            const response = await axios.post("http://localhost:8000/login",userData, {

              headers: {"Content-Type":"application/json"},
              withCredentials: true

            });

            dispatch( setAuthUser(response.data.user) );
            toast.success('Welcome, Redirecting you to home screen...');
            navigate("/");

        }
        catch(error)
        {
           toast.error("Error while logging in !");
        }

    }

  return (
    <div className="flex items-center justify-center h-screen">
        <form onSubmit={submitHandler} className="w-96 p-8 shadow-lg">

        
            <div className="flex justify-center">
                <Logo />
            </div>

            <div>
                <Label className="mb-1 mt-3">E-mail :</Label>
                <Input type="email" name="email" value={userData.email} onChange={inputHandler} />
            </div>

            <div>
                <Label className="mb-1 mt-3">Password :</Label>
                <Input type="password" name="password" value={userData.password} onChange={inputHandler} />
            </div>

            <div className="mt-5">
                <Button className="w-full bg-gradient-to-tr from-lime-400 to-yellow-200 text-lime-950 cursor-pointer hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">Let's Go!</Button>
                <Link to="/signup"><p className="text-center mt-1.5 text-xs text-blue-700">New user? Sign up</p></Link>
            </div>

        </form>

    </div>
  )
}

export default Login;
