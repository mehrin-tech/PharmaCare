import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ListOrderedIcon } from "lucide-react";


export const getMyOrders=createAsyncThunk(
    'orders/getMyOrders',
    async(_,{rejectWithValue})=>{
        try{
            const response=await api.get('/orders/my')
            return response.data

        }catch(error){
            return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch orders"
      );

        }
    }
)

export const trackOrder=createAsyncThunk(
    'order/trackOrder',
    async(orderId,{rejectWithValue})=>{
        try{
            const response=await api.get(`/orders/${orderId}/track`)
            return response.data
        }catch(error){
             return rejectWithValue(
        error.response?.data?.message ||
        "Failed to track order"
      );
        }
    }
)
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/orders/${orderId}/cancel`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to cancel order"
      );
    }
  }
);
export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/orders/${orderId}`
      );

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
  selectedOrder: null,

  trackingOrder: null,

  loading: false,
  orderDetailsLoading: false,
  trackingLoading: false,

  error: null,
  orderDetailsError: null,
  trackingError: null,
};

const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
         clearOrderError: (state) => {
      state.error = null;
    },
    clearTrackingError:(state)=>{
        state.trackingError=null
    },
    clearTrackingOrder:(state)=>{
        state.trackingOrder=null
    }
    },
    extraReducers:(builder)=>{
        builder.addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled,(state,action)=>{
        state.loading=false
        state.orders=action.payload.orders || []
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
       .addCase(trackOrder.pending, (state) => {
        state.trackingLoading = true;

        state.trackingError = null;

        state.trackingOrder = null;
      })

      .addCase(trackOrder.fulfilled, (state, action) => {
        state.trackingLoading = false;

        state.trackingOrder =
          action.payload;
      })

      .addCase(trackOrder.rejected, (state, action) => {
        state.trackingLoading = false;

        state.trackingError =
          action.payload;
      })
       // =========================
    // CANCEL ORDER
    // =========================

    .addCase(cancelOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(cancelOrder.fulfilled, (state, action) => {
      state.loading = false;

      const cancelledOrder = action.payload.order;

      state.orders = state.orders.map((order) =>
        order._id === cancelledOrder._id
          ? cancelledOrder
          : order
      );
    })

    .addCase(cancelOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getOrderDetails.pending, (state) => {
  state.orderDetailsLoading = true;
  state.orderDetailsError = null;
  state.selectedOrder = null;
})

.addCase(getOrderDetails.fulfilled, (state, action) => {
  state.orderDetailsLoading = false;

  state.selectedOrder =
    action.payload.order;
})

.addCase(getOrderDetails.rejected, (state, action) => {
  state.orderDetailsLoading = false;

  state.orderDetailsError =
    action.payload;
})
}
    
})

export const {
  clearOrderError,
   clearTrackingError,
  clearTrackingOrder,
} = orderSlice.actions;


export default orderSlice.reducer;