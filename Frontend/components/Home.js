import React, {use, useState} from 'react';
import { Button } from "./ui/button.js";
import Navbar from './Navbar.js';
import CreateExpense from './CreateExpense.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.js";

import { useDispatch } from 'react-redux';
import { setSliceCategory, setSliceMarkAsDone } from '../src/redux/expenseSlice.js';
import ExpenseTable from './ExpenseTable.js';
import useGetExpenses from '../src/hooks/useGetExpenses.js';

const Home = () => {

  const dispatch = useDispatch();

  useGetExpenses();

  const categoryHandler = (value) => {

    dispatch(setSliceCategory(value));

  }

  const doneHandler = (value) => {

    dispatch(setSliceMarkAsDone(value));

  }

  return (
    <div>

      <Navbar />

      <div className="w-6xl mx-auto mt-8">

        <div className="flex items-center justify-between mb-5">
          <h1>Expense</h1>
          <CreateExpense />
        </div>

        <div className="flex items-center gap-x-2">
          <h1 className="font-medium text-lg">Filter By:</h1>

          <Select onValueChange={categoryHandler}>
          <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="bills">Bills</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="all">all</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={doneHandler}>
          <SelectTrigger><SelectValue placeholder="Mark As" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="not done">Not Done</SelectItem>
            <SelectItem value="both">both</SelectItem>
          </SelectContent>
        </Select>

        </div>

        <ExpenseTable />

      </div>
    </div>
  )
}

export default Home;
