import React, { useState } from 'react'

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table.js";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button.js';
import { Checkbox } from './ui/checkbox.js';
import { Trash, Edit2, Edit } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { setExpenses } from "../src/redux/expenseSlice.js";
import UpdateExpense from './UpdateExpense.js';
import backendURL from "../backendURL.js";

const ExpenseTable = () => {

    const{expenses} = useSelector((store)=>{return store.expense});
    const dispatch = useDispatch();

    const handleCheckbox = async (exp) => {

        const newState = !exp.done;

        try
        {
            const res = await axios.put(`${backendURL}/mark-as-done/${exp._id}`,{done:newState},{withCredentials:true});

            dispatch(setExpenses( expenses.map((expense)=>{

                return expense._id == exp._id ? {...expense, done:newState} : expense;

            }) ));

            toast.success(newState ? "Marked" : "Un-marked");
        }
        catch(error)
        {
            console.log(error);
        }

    }

    const deleteBtn = async(e) => {

        try
        {
            const res = await axios.delete(`${backendURL}/remove-expense/${e._id}`,{ withCredentials: true});

            console.log(res.data);

            toast.warning("Expense Deleted Successfully !");
            const filterExpenses = expenses.filter((currExp) => { return currExp._id !== e._id });
            dispatch(setExpenses(filterExpenses));

        }
        catch(e)
        {
            console.log(e);
        }
    }

  return (
    <div>
        <Table>
            <TableCaption>That's all</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Mark As Done</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    expenses.map((value)=>{

                        return (
                            <TableRow key={value._id}>
                                <TableCell><Checkbox checked={value.done} onCheckedChange={(set)=>{handleCheckbox(value)}}></Checkbox></TableCell>
                                <TableCell className={value.done ? "line-through" :""}>{value.description}</TableCell>
                                <TableCell className={value.done ? "line-through" :""}>{value.amount}</TableCell>
                                <TableCell className={value.done ? "line-through" :""}>{value.category}</TableCell>
                                <TableCell className={value.done ? "line-through" :""}>{value.createdAt.substring(0,10)}</TableCell>
                                <TableCell>
                                    <div className="flex gap-x-2">
                                        {/*<Button className="rounded-full border bg-white border-blue-600 text-blue-600 hover:bg-blue-600 cursor-pointer hover:text-white" size="icon"><Edit/></Button>*/}
                                        <UpdateExpense expense={value} />
                                        <Button className="rounded-full border bg-white border-red-600 text-red-600 hover:bg-red-500 cursor-pointer hover:text-white" size="icon" onClick={()=>{deleteBtn(value)}}><Trash/></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );

                    })
                }
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5} className="font-bold text-xl">Total</TableCell>
                    <TableCell className="font-bold text-xl text-right text-red-600">XXX INR</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
  );

}

export default ExpenseTable
