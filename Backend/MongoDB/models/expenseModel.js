const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false,
    },
    userID: {
        //type: function
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }

},{timestamps:true});

const expense = mongoose.model("Expense", expenseSchema);

module.exports = expense;