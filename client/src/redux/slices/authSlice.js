// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: null,
//     token: localStorage.getItem("token"),
//     isAuthenticated: !!localStorage.getItem("token"),
// };

// const authSlice = createSlice({
//     name: "auth",

//     initialState,

//     reducers: {
//         setCredentials: (state, action) => {
//             const { user, token } = action.payload;

//             state.user = user;
//             state.token = token;
//             state.isAuthenticated = true;

//             localStorage.setItem("token", token);
//         },

//         setUser: (state, action) => {
//             state.user = action.payload;
//         },

//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//             state.isAuthenticated = false;

//             localStorage.removeItem("token");
//         },
//     },
// });

// export const {
//     setCredentials,
//     setUser,
//     logout,
// } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isAuthenticated: !!storedToken,
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
      localStorage.setItem("user", JSON.stringify(user));
    },

    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
