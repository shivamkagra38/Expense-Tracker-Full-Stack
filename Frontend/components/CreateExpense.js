import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog.js";
import { Button } from './ui/button.js';
import { Label } from './ui/label.js';
import { Input } from './ui/input.js';

const CreateExpense = () => {
  return (

    <Dialog>

        <DialogTrigger asChild>
            <Button variant="outline">Add Expense</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">

            <DialogHeader>
                <DialogTitle>Add Expense</DialogTitle>
            </DialogHeader>

            <div>
                <Label>Name</Label>
                <Input type="text" />
            </div>

        </DialogContent>

    </Dialog>

  )
}

export default CreateExpense
