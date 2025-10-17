const expenseModel = require("../MongoDB/models/expenseModel.js");

const addExpense = async (req, res) => {

    try
    {
        const{description, amount, category} = req.body;

        if(!description || !amount || !category)
        {
            res.status(400).json({message:"All fields are required", success: false});
            return;
        }

        const expense = await expenseModel.create({
            description,
            amount,
            category,
            userId: req.id
        });

        res.status(201).json({message:"Expense added successfully", success: true, expense});
        return;

    }
    catch(addExpenseError)
    {
        console.log("Error occured while adding expense");
        res.status(400).json({
            message:"error while adding expense",
            success: false
        });
    }

}

const getAllExpenses = async (req, res) => {

    try
    {
        const userId = req.id;
        const category = req.query.category ? req.query.category  : "all";
        const done = req.query.done ? req.query.done : "";

        const query = {userId}

        if(category.toLowerCase() !== "all")
        {
            query.category = {$regex: category, $options:'i'}
        }

        if(done.toLowerCase() === "done")
        {
            query.done = true
        }
        else if(done.toLowerCase() === "undone")
        {
            query.done = false
        }

        const expense = await expenseModel.find(query);

        res.status(200).json({expense, message:"Records fetched successfully",success:true});
        return;

    }
    catch(expensesFetchError)
    {
        console.log("Error while fetching expenses");
        res.status(400).json({message:"Error while fetching expenses", success:false});
    }

}

const markAsDone = async (req, res) => {

    try
    {
        const expenseId = req.params.id;
        const done = req.body;

        const markAsDoneStatus = await expenseModel.findByIdAndUpdate(expenseId, done, {new: true});

        if(!markAsDoneStatus)
        {
            res.status(400).json({message: "Error while marking the status", success:false});
            return;
        }

        res.status(200).json({message: "Status marked successfully", success:true});

        console.log(markAsDone);
    }
    catch(markAsDoneError)
    {
        console.log("Error while marking the status");
        res.status(400).json({message:"Error while marking the status", success:false})
    }

}

const removeExpense = async (req, res) => {

    try
    {
        const expenseId = req.params.id;
        const deleteStatus = await expenseModel.findByIdAndDelete(expenseId);

        if(!deleteStatus)
        {
            console.log("Not able to find any record");
            res.status(400).json({message:"Error while removing an expense", success:false});
            return;
        }
        res.status(200).json({message:"Requested expense deleted successfully", success:true, expense: deleteStatus});
    }
    catch(removeExpenseError)
    {
        console.log("Error while removing an expense");
        res.status(400).json({message:"Error while removing an expense", success:false});
    }

}

const updateExpense = async (req, res) => {

    try
    {
        const{description, amount, category} = req.body;
        const expenseId = req.params.id;
        const updatedExpense = {description, amount, category};

        const updateExpenseStatus = await expenseModel.findByIdAndUpdate(expenseId, updatedExpense, {new: true});

        console.log(updateExpenseStatus);

        if(!updateExpenseStatus)
        {
            res.status(400).json({message:"Error while updating an expense", success:false});
            return;
        }

        res.status(200).json({message:"Update successful", success:true, updateExpenseStatus});
    }
    catch(updateExpenseError)
    {
        console.log("Error while updating an expense");
        res.status(400).json({message:"Error while updating an expense", success:false});
    }

}

module.exports = {addExpense, getAllExpenses, markAsDone, removeExpense, updateExpense}