const expenseModel = require("../MongoDB/models/expenseModel.js");

const addExpense = (req, res) => {

    try
    {
        const{description, amount, category, done, userId} = req.body;
    }
    catch(addExpenseError)
    {
        console.log("Error occured while adding expense");
        res.status(400).json({
            
        });
    }

}