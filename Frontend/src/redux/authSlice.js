import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

    name: "auth",
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {

        //actions
        setLoading: (state, action) => {

            //Mutating previous state
            state.loading = action.payload;

        },

        setAuthUser: (state, action) => {

            state.user = action.payload;

        }

    }

});

export const setLoading = authSlice.actions.setLoading;
export const setAuthUser = authSlice.actions.setAuthUser;

export default authSlice.reducer;