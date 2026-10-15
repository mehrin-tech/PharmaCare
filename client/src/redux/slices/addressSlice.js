import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import api from "../../services/api";

//get address
export const getAddresses = createAsyncThunk(
    "address/getAddresses",
    async (__dirname, { rejectWithValue }) => {
        try {
            const response = await api.get('/addresses/my')
            console.log("ADDRESS RESPONSE:", response.data);
            return response.data

        } catch (error) {

            console.log("ADDRESS ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            return rejectWithValue(
                error.response?.data?.message || "failed to fetch addresses"
            )

        }
    }
)

export const addAddress = createAsyncThunk(
    "address/addAddress",
    async (addressData, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/addresses",
                addressData
            );

            console.log(
                "ADD ADDRESS RESPONSE:",
                response.data
            );

            return response.data;

        } catch (error) {

            console.log("ADD ADDRESS ERROR:", error);
            console.log(
                "STATUS:",
                error.response?.status
            );
            console.log(
                "DATA:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to add address"
            );
        }
    }
);

//update address
export const updateAddress = createAsyncThunk(
    "address/updateAddress",
    async ({ addressId, addressData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/addresses/${addressId}`,
                addressData
            )

            return response.data

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to update address")

        }
    }
)

//set Default
export const setDefaultAddress = createAsyncThunk(
    "address/setDefaultAddress",
    async (addressId, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/addresses/${addressId}/default`
            )
            return response.data

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "failed to set address"
            )

        }
    }
)

//delete address
export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            await api.delete(`/addresses/${addressId}`)
            return addressId

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to delete address")

        }
    }
)


const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [],
        loading: false,
        error: null
    },
    reducers: {
        clearAddressError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAddresses.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload.addresses
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
           .addCase(addAddress.pending, (state) => {
    state.loading = true;
    state.error = null;
})

.addCase(addAddress.fulfilled, (state, action) => {
    state.loading = false;

    state.addresses.push(
        action.payload.address
    );
})

.addCase(addAddress.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
})
            .addCase(updateAddress.fulfilled, (state, action) => {
                const updateAddress = action.payload.address
                const index = state.addresses.findIndex((address) => address._id === updateAddress._id)

                if (index !== -1) {
                    state.addresses[index] = updateAddress
                }
            })
            .addCase(setDefaultAddress.fulfilled, (state, action) => {
                const defaultAddress = action.payload.address;
                state.addresses = state.addresses.map((address) => ({
                    ...address,
                    isDefault: address._id === defaultAddress._id
                }))
            })
            // DELETE
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses =
                    state.addresses.filter(
                        (address) =>
                            address._id !== action.payload
                    );
            });
    },
});

export const { clearAddressError } =
    addressSlice.actions;

export default addressSlice.reducer;