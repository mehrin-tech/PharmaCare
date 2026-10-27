import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from '../../services/api'

//fetch all order

export const getAllAdminOrders=createAsyncThunk(
    'adminOrder/getAllOrders',
    async({page=1,limit=10}={},{rejectWithValue})=>{
        try{

            const response=await api.get('/admin/orders',{
              params:{page,limit}
            })
            console.log('response:',response.data)
            return response.data

        }catch(error){
            return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );

        }
    }
)

// Fetch order statistics
export const getAdminOrderStatistics = createAsyncThunk(
  "adminOrder/getOrderStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/orders/statistics");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch order statistics"
      );
    }
  }
);


// Fetch individual order details
export const getAdminOrderDetails = createAsyncThunk(
  "adminOrder/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch order details"
      );
    }
  }
);


const initialState = {
  orders: [],
  orderStatistics: null,
  selectedOrder: null,

  ordersLoading: false,
  statisticsLoading: false,
  detailsLoading: false,

  ordersError: null,
  statisticsError: null,
  detailsError: null,

  pagination: {
  currentPage: 1,
  totalPages: 0,
  totalOrders: 0,
  limit: 10,
  hasNextPage: false,
  hasPrevPage: false,
},
};


const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
      state.detailsError = null;
    },
    clearAdminOrderErrors: (state) => {
      state.ordersError = null;
      state.statisticsError = null;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // All orders
      .addCase(getAllAdminOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
    .addCase(getAllAdminOrders.fulfilled, (state, action) => {
  state.ordersLoading = false;

  const payload = action.payload;

  state.orders = Array.isArray(payload?.orders)
    ? payload.orders
    : [];

  if (payload?.pagination) {
    state.pagination = payload.pagination;
  }

  state.ordersError = null;
})
      .addCase(getAllAdminOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      })

      // Order statistics
      .addCase(getAdminOrderStatistics.pending, (state) => {
        state.statisticsLoading = true;
        state.statisticsError = null;
      })
      .addCase(getAdminOrderStatistics.fulfilled, (state, action) => {
        state.statisticsLoading = false;
        state.orderStatistics = action.payload;
      })
      .addCase(getAdminOrderStatistics.rejected, (state, action) => {
        state.statisticsLoading = false;
        state.statisticsError = action.payload;
      })

      // Individual order details
      .addCase(getAdminOrderDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
        state.selectedOrder = null;
      })
      .addCase(getAdminOrderDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedOrder =
          action.payload?.order || action.payload;
      })
      .addCase(getAdminOrderDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload;
      });
  },
});

export const {
  clearSelectedOrder,
  clearAdminOrderErrors,
} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;