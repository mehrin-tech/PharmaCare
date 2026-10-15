import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;

            state.user = user;
            state.token = token;
            state.isAuthenticated = true;

            localStorage.setItem("token", token);
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem("token");
        },
    },
});

export const {
    setCredentials,
    setUser,
    logout,
} = authSlice.actions;

export default authSlice.reducer;