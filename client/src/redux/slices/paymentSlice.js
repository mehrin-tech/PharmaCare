import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../services/api"

//createrazor payment
export const createPayment=createAsyncThunk(
    "payment/createPayment",
    async({orderId,paymentMethod},{rejectWithValue})=>{
        try{
            const response=await api.post('/payments',{
                orderId,
                paymentMethod
            })
            return response.data

        }catch(error){
            return rejectWithValue(
        error.response?.data?.message ||
        "Failed to initiate payment"
      );

        }
    }
)
//payment success
export const paymentSuccess=createAsyncThunk(
    'payment/paymentSuccess',
    async({paymentId,razorpay_order_id,razorpay_payment_id,razorpay_signature},{rejectWithValue})=>{
        try{
            const response=await api.post(`/payments/${paymentId}/success`,{
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })
            return response.data

        }catch(error){
              return rejectWithValue(
        error.response?.data?.message ||
        "Payment verification failed"
      );


        }
    }
)
//payment failed
export const paymentFailed=createAsyncThunk(
    'payment/paymentFailed',
    async(paymentId,{rejectWithValue})=>{
        try{
            const response=await api.patch(
                `/payments/${paymentId}/failed`
            )
            return response.data

        }catch(error){
             return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update payment"
      );

        }
    }
)

const initialState={
    payment:null,
    razorpay:null,
    loading:false,
    error:null,
    success:false
}

const paymentSlice=createSlice({
    name:'payment',
    initialState,
    reducers:{
        clearPayment:(state)=>{
            state.payment=null
            state.razorpay=null
            state.loading=false
            state.error=null
            state.success=false

        }
    },
    extraReducers:(builder)=>{
        builder
         // CREATE PAYMENT
      .addCase(createPayment.pending, (state) => {

        state.loading = true;
        state.error = null;

      })

      .addCase(createPayment.fulfilled, (state, action) => {

        state.loading = false;

        state.payment = action.payload.payment;

        state.razorpay = action.payload.razorpay;

      })

      .addCase(createPayment.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

        // PAYMENT SUCCESS
      .addCase(paymentSuccess.pending, (state) => {

        state.loading = true;
        state.error = null;

      })

      .addCase(paymentSuccess.fulfilled, (state, action) => {

        state.loading = false;

        state.payment = action.payload.payment;

        state.success = true;

      })

      .addCase(paymentSuccess.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

        state.success = false;

      })
      // PAYMENT FAILED
      .addCase(paymentFailed.fulfilled, (state, action) => {

        state.payment = action.payload.payment;

        state.success = false;

      })

      .addCase(paymentFailed.rejected, (state, action) => {

        state.error = action.payload;

      });
    }
    
})

export const {
  clearPayment
} = paymentSlice.actions;


export default paymentSlice.reducer;