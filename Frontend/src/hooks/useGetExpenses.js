import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../redux/expenseSlice.js";

const useGetExpenses = () => {

    const dispatch = useDispatch();
    const{category, markAsDone} = useSelector((store)=>{return store.expense});

    useEffect(()=>{

        const fetchExpenses = async () => {

            try
            {
                const response = await axios.post(`http://localhost:8000/get-all-expenses?category=${category}&done=${markAsDone}`,{},{
                    withCredentials: true
                });
                
                dispatch(setExpenses(response.data.expense));
            }
            catch(error)
            {
                console.log(error);
            }

        } 

        fetchExpenses();

    },[category, markAsDone]);

};

export default useGetExpenses;