import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from "./ui/input";
import { Button } from './ui/button';

import Logo from './Logo.js';
import { Link } from 'react-router';
import axios from 'axios';

const Signup = () => {

    const [userData, setUserData] = useState({fullname:"", email:"", password:""});
    const[message, setMessage] = useState("");

    //Handling user input
    const inputHandler = (e) => {
        setUserData({...userData, [e.target.name]:e.target.value});
    }

    //Handling submission request
    const submitHandler = async (e) => {

        //Preventing submission
        e.preventDefault();

        const{fullname, email, password} = userData;

        try
        {
            if(fullname.length == 0 || email.length == 0 || password.length == 0)
            {
                setMessage("All fields are mandatory.");
                return;
            }

            setMessage("Processing your request...");

            const response = await axios.post("http://localhost:8000/register",userData);

            console.log(response);
            setMessage("Welcome to the team ✅");
        }
        catch(error)
        {
            console.log(error);
            setMessage("Opps! Error while signing up");
        }

    }

  return (
    <div className="flex items-center justify-center h-screen">
        <form onSubmit={submitHandler} className="w-96 p-8 shadow-lg">

        
            <div className="flex justify-center">
                <Logo />
            </div>

            <div>
                <Label className="mb-1 mt-3">Full Name :</Label>
                <Input type="text" name="fullname" value={userData.fullname} onChange={inputHandler} />
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
                <Link to="/login"><p className="text-center mt-1.5 text-xs text-blue-700">Already have an account? Login</p></Link>
            </div>
            
            <div className={message === "Welcome to the team ✅" ? "mt-5 text-center text-lime-700 text-sm" : "mt-5 text-center text-red-700"}>
                <p>{message}</p>
            </div>
        </form>

    </div>
  )
}

export default Signup;
