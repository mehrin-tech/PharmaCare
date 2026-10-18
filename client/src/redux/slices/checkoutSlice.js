import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../services/api'


export const placeOrder=createAsyncThunk(
    'checkout/placeOrder',
    async({pharmacyId,deliveryMethod,paymentMethod},{rejectWithValue})=>{
        try{
            const response=await api.post('/orders',{
                pharmacyId,deliveryMethod,paymentMethod
            })
            return response.data

        }catch(error){
              return rejectWithValue(
        error.response?.data?.message ||
        "Failed to place order"
      );

        }
    }
)

//initial state
const initialState={
    selectedPharmacy:null,
    selectedDeliveryMethod:'standard',
    selectedPaymentMethod:'cod',
    order:null,
    loading:false,
    error:null,
    success:false
}

const checkoutSlice=createSlice({
    name:'checkout',
    initialState,
    reducers:{
        setSelectedPharmacy:(state,action)=>{
            state.selectedPharmacy=action.payload
        },
        setSelectedDeliveryMethod:(state,action)=>{
            state.selectedDeliveryMethod=action.payload
        },
        setSelectedPaymentMethod:(state,action)=>{
            state.selectedPaymentMethod=action.payload
        },
        clearCheckout: (state) => {

      state.selectedPharmacy = null;

      state.selectedDeliveryMethod = "standard";

      state.selectedPaymentMethod = "cod";

      state.order = null;

      state.loading = false;

      state.error = null;

      state.success = false;

    },
    clearCheckoutError:(state)=>{
        state.error=null
    }
    },
    extraReducers:(builder)=>{
        builder.addCase(placeOrder.pending,(state)=>{
            state.loading=true
            state.error=null
            state.success=false
        })
        .addCase(placeOrder.fulfilled,(state,action)=>{
            state.loading=false
            state.order=action.payload.order
            state.success=true
        })
         .addCase(placeOrder.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

        state.success = false;

      });
    }

})

export const {
  setSelectedPharmacy,
  setSelectedDeliveryMethod,
  setSelectedPaymentMethod,
  clearCheckout,
  clearCheckoutError
} = checkoutSlice.actions;


export default checkoutSlice.reducer;