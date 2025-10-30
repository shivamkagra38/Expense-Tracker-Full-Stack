import React from 'react'

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table.js";
import { useSelector } from 'react-redux';
import { Button } from './ui/button.js';
import { Checkbox } from './ui/checkbox.js';
import { Trash } from 'lucide-react';

const ExpenseTable = () => {

    const{expenses} = useSelector((store)=>{return store.expense});

    const handleCheckbox = (set,id) => {



    }

    console.log(expenses);

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
                                <TableCell><Checkbox checked={value.done} onCheckedChange={(set)=>{set,handleCheckbox(value._id)}}></Checkbox></TableCell>
                                <TableCell>{value.description}</TableCell>
                                <TableCell>{value.amount}</TableCell>
                                <TableCell>{value.category}</TableCell>
                                <TableCell>{value.createdAt.substring(0,10)}</TableCell>
                                <TableCell>
                                    <div className="flex gap-x-2">
                                        <Button></Button> 
                                        <Button className="bg-red-600"><Trash/></Button>
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
