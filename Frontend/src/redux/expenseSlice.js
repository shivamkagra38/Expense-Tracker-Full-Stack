import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({

    name: "expense",
    initialState:{

        category:"",
        markAsDone:"",
        expenses:[]

    },
    reducers: {

        setCategory: (state, action) => {

            state.category = action.payload;

        },
        setMarkAsDOne: (state, action) => {

            state.markAsDone = action.payload;

        },
        setExpenses: (state, action) => {

            state.expenses = action.payload;

        }

    }

});

export const setSliceCategory = expenseSlice.actions.setCategory;
export const setSliceMarkAsDone = expenseSlice.actions.setMarkAsDOne;
export const setExpenses = expenseSlice.actions.setExpenses;

export default expenseSlice.reducer;