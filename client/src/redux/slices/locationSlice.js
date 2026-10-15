import { createSlice } from "@reduxjs/toolkit";

const savedLocation = localStorage.getItem("pharmacareLocation");

const initialState = savedLocation
    ? JSON.parse(savedLocation)
    : {
          city: "Set location",
          latitude: null,
          longitude: null,
          fullAddress: "",
          loading: false,
          permissionDenied: false,
      };

const locationSlice = createSlice({
    name: "location",

    initialState,

    reducers: {
        setLocation: (state, action) => {
            const location = action.payload;

            state.city = location.city || "Set location";
            state.latitude = location.latitude || null;
            state.longitude = location.longitude || null;
            state.fullAddress = location.fullAddress || "";
            state.loading = false;
            state.permissionDenied = false;

            localStorage.setItem(
                "pharmacareLocation",
                JSON.stringify(state)
            );
        },

        setLocationLoading: (state, action) => {
            state.loading = action.payload;
        },

        setPermissionDenied: (state, action) => {
            state.permissionDenied = action.payload;
            state.loading = false;
        },

        clearLocation: (state) => {
            state.city = "Set location";
            state.latitude = null;
            state.longitude = null;
            state.fullAddress = "";
            state.loading = false;
            state.permissionDenied = false;

            localStorage.removeItem("pharmacareLocation");
        },
    },
});

export const {
    setLocation,
    setLocationLoading,
    setPermissionDenied,
    clearLocation,
} = locationSlice.actions;

export default locationSlice.reducer;