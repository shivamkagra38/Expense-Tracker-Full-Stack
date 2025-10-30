import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog.js";
import { Button } from './ui/button.js';
import { Label } from './ui/label.js';
import { Input } from './ui/input.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.js";
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const CreateExpense = (props) => {

    //console.log("<CreateExpense/>");
    const[formData, setFormData] = useState({description:"", amount:"", category:""});
    const[loading, setLoading] = useState(false);
    const[isOpen, setIsOpen] = useState(false);
    
    const inputHandler = (e) => {

        setFormData((previousFormData)=>{
            return {...previousFormData, [e.target.name]:e.target.value}
        });
    }

    const categoryHandler = (categoryValue) => {

        setFormData((previousFormData)=>{

            return {...previousFormData, category: categoryValue}

        });

    }

    const submitHandler = async (e) => {

        e.preventDefault();

        setLoading(true);

        try
        {
            const response = await axios.post("http://localhost:8000/add-expense",formData,{withCredentials: true});
            console.log(response);

            if(response.data.success)
            {
                toast.success("Expense added !");
                setIsOpen(false);
                setFormData({description:"", amount:"", category:""});
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error("Not able to add expense");
        }
        finally
        {
            setLoading(false);
        }
    }

  return (

    <Dialog open={isOpen} onOpenChange={(e)=>{setIsOpen(e)}} >

        <DialogTrigger asChild>
            <Button variant="outline" onClick={ ()=> { setIsOpen(true) } } >Add Expense</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">

            <DialogHeader>
                <DialogTitle>Add Expense</DialogTitle>
            </DialogHeader>

            <form onSubmit={submitHandler}>
            <div className="mb-3">
                <Label className="mb-1.5">Description</Label>
                <Input type="text" name="description" value={formData.description} onChange={inputHandler} />
            </div>

            <div className="mb-3">
                <Label className="mb-1.5">Amount</Label>
                <Input type="number" name="amount" value={formData.amount} onChange={inputHandler} />
            </div>

            <div className="mb-3">
                <Label className="mb-1.5">Category</Label>
                <Select onValueChange={categoryHandler} value={formData.category} >

                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="bills">Bills</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="others">Others...</SelectItem>
                    </SelectContent>

                </Select>
            </div>

            <DialogFooter>
                {
                    loading ? <Button className="bg-green-600"><Loader2 className="animate-spin" /> Please wait</Button> : <Button type="submit">Done !</Button>
                }
            </DialogFooter>
            </form>

        </DialogContent>

    </Dialog>

  )
}

export default CreateExpense
