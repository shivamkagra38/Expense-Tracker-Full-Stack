import React, { useState } from 'react'
import { Button } from './ui/button';
import { Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog.js";
import { Label } from './ui/label.js';
import { Input } from './ui/input.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.js";
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses } from '../src/redux/expenseSlice.js';
import backendURL from "../backendURL.js";

const UpdateExpense = (props) => {

  const[updateForm, setUpdateForm] = useState({description:props.expense.description, amount:props.expense.amount, category:props.expense.category});
  const dispatch = useDispatch();

  const allExpenses = useSelector( (store) => {return store.expense} ).expenses;

  const handleInput = (e) => {

    setUpdateForm({...updateForm, [e.target.name]: e.target.value });

  };

  const categoryHandler = (e) => {
    setUpdateForm({...updateForm, category:e});
  }

  const updateHandler = async (e) => {

    e.preventDefault();

    try
    {
      const res = await axios.put(`${backendURL}/update-expense/${props.expense._id}`,updateForm,{withCredentials:true});
      toast.success("Update Successful !");

      const filterArr = allExpenses.map((e)=>{

        return e._id == props.expense._id ? res.data.updateExpenseStatus : e;

      });

      dispatch(setExpenses(filterArr));

    }
    catch(error)
    {
      console.log(error);
    }

  }

  return (

    <Dialog>

      <DialogTrigger asChild>
        <Button className="rounded-full border bg-white border-blue-600 text-blue-600 hover:bg-blue-600 cursor-pointer hover:text-white" size="icon"><Edit/></Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={updateHandler}>

          <div className="mb-3">
            <Label className="mb-1.5">Description</Label>
            <Input type="text" name="description" value={updateForm.description} onChange={handleInput}></Input>
          </div>

          <div className="mb-3">
            <Label className="mb-1.5">Amount</Label>
            <Input type="number" name="amount" value={updateForm.amount} onChange={handleInput}></Input>
          </div>

          <div className="mb-3">
            <Label className="mb-1.5">Category</Label>
            <Select value={updateForm.category} onValueChange={categoryHandler}>

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
            
            <Button type="submit" className="bg-blue-600 hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600">Done !</Button>
          
          </DialogFooter>

          </form>


      </DialogContent>

    </Dialog>

  );
  
}

export default UpdateExpense;

// <Button className="rounded-full border bg-white border-blue-600 text-blue-600 hover:bg-blue-600 cursor-pointer hover:text-white" size="icon"><Edit/></Button>
