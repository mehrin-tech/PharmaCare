
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

//fetch all customers

export const fetchCustomers=createAsyncThunk(
    'adminUsers/fetchCustomers',
    async(_,{rejectWithValue})=>{
        try{
            const response=await api.get('/admin/customers')
             console.log("CUSTOMERS API RESPONSE:", response.data)
            return response.data

        }catch(error){
              console.error("CUSTOMERS API ERROR:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
             return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch customers"
      );

        }
    }
)


// FETCH CUSTOMER DETAILS
export const fetchCustomerDetails = createAsyncThunk(
  "adminUsers/fetchCustomerDetails",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/customers/${customerId}`
      );
      return response.data.customer || response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch customer details"
      );
    }
  }
);

// UPDATE CUSTOMER STATUS
export const updateCustomerStatus = createAsyncThunk(
  "adminUsers/updateCustomerStatus",
  async ({ customerId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/customers/${customerId}/status`,
        { status }
      );

      return {
        customerId,
        status,
        customer: response.data.customer,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update customer status"
      );
    }
  }
);



const initialState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  detailsLoading: false,
  statusLoading: false,
  error: null,
  detailsError: null,
};

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    clearAdminUserError: (state) => {
      state.error = null;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH CUSTOMERS
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
  state.loading = false;

  const payload = action.payload;

  state.customers = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.customers)
      ? payload.customers
      : [];

  state.error = null;

  console.log("Customers saved to Redux:", state.customers);
})
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CUSTOMER DETAILS
      .addCase(fetchCustomerDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
        state.selectedCustomer = null;
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload;
      })

      // UPDATE CUSTOMER STATUS
      .addCase(updateCustomerStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })
      .addCase(updateCustomerStatus.fulfilled, (state, action) => {
        state.statusLoading = false;

        const { customerId, status, customer } = action.payload;

        state.customers = state.customers.map((item) =>
          item._id === customerId
            ? {
                ...item,
                ...(customer || {}),
                ...(!customer ? { status } : {}),
              }
            : item
        );

        if (state.selectedCustomer?._id === customerId) {
          state.selectedCustomer = {
            ...state.selectedCustomer,
            ...(customer || {}),
            ...(!customer ? { status } : {}),
          };
        }
      })
      .addCase(updateCustomerStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearAdminUserError,
  clearSelectedCustomer,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;