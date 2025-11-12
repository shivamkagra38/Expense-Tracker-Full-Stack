import React, { useState } from 'react';
import Logo from './Logo';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.js"
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button.js';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {

   // const[user, setUser] = useState(false);
    const navigate = useNavigate();

    const user = useSelector((store)=>{return store.auth});

    console.log(user);

    const logoutHandler = async () => {

        try
        {
            //Network call...
            const response = await axios.get("http://localhost:8000/logout", {
                withCredentials: true
            });

            if(response.data.status)
            {
                console.log("Logged out");
                toast.success("Logged out successfully");
                navigate("/login");
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error("Error while logging out !");
        }
    }

  return (
    <div className="border-b">

        <div className="flex items-center justify-between px-8 py-2">

        <Logo />
        {
            user.user ?
            (
                <Popover>
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Button className="w-full bg-red-600" onClick={logoutHandler}>Log out</Button>
                    </PopoverContent>
                </Popover>
            )
            :
            (
                <div className="flex gap-2">
                    <Link to="/login"><Button className="bg-gradient-to-tr from-lime-400 to-yellow-200 text-lime-950 cursor-pointer hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">Login</Button></Link>
                    <Link to="/signup"><Button className="bg-gradient-to-tr from-orange-300 to-yellow-200 text-lime-950 cursor-pointer hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">Sign up</Button></Link>
                </div>
            )
        }

        </div>

    </div>
  )
}

export default Navbar
