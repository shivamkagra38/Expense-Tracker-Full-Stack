import React from 'react';
import { Button } from "./ui/button.js";
import Navbar from './Navbar.js';
import CreateExpense from './CreateExpense.js';

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Expense</h1>
      <CreateExpense />
    </div>
  )
}

export default Home;
