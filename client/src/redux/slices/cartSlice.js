import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from '../../services/api'


//getMy cart

export const fetchCart=createAsyncThunk(
    "cart/fetchCart",
    async(__,{rejectWithValue})=>{
        try{
            const response=await api.get('/cart/my')
            return response.data.cart

        }catch(error){
            return rejectWithValue(error.response?.data?.message || "failed to fetch cart")

    }
    }
)
//add to cart

export  const addToCart=createAsyncThunk(
    'cart/addToCart',
    async({medicineId,quantity=1},{rejectWithValue})=>{
        try{
            const response=await api.post('/cart',{
                medicineId,quantity
            })
            return response.data.cart

        }catch(error){
            return rejectWithValue(error.response?.data?.message || "failed to add item to cart")

        }

    }
)

//updateCartQuantity
export const updateCartQuantity=createAsyncThunk(
    "cart/updateCartQuantity",
    async({medicineId,quantity},{rejectWithValue})=>{
        try{
            const response=await api.patch(`/cart/${medicineId}`,
                {quantity})

                return response.data.cart

        }catch(error){

            return rejectWithValue(error.response?.data?.message || "failed to update cart")

        }
    }
)

//remove cart

export const removeCart=createAsyncThunk(
    "cart/removeCart",
    async(medicineId,{rejectWithValue})=>{
        try{
            const response=await api.delete(`/cart/${medicineId}`)
            return response.data.cart

        }catch(error){

             return rejectWithValue(
        error.response?.data?.message ||
        "Failed to remove item"
      );

        }
    }
)
//initial state
const initialState={
    cart:null,
    loading:false,
    error:null
}

//cart slice

const CartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{},

    //asyncApi States

    extraReducers:(builder)=>{
        builder.addCase(fetchCart.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(updateCartQuantity.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(updateCartQuantity.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload
        })
        
        .addCase(
  updateCartQuantity.rejected,
  (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
)
.addCase(
  removeCart.pending,
  (state) => {
    state.loading = true;
    state.error = null;
  }
)

.addCase(
  removeCart.fulfilled,
  (state, action) => {
    state.loading = false;
    state.cart = action.payload;
  }
)

.addCase(
  removeCart.rejected,
  (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
)
.addCase(addToCart.pending,(state)=>{
    state.loading=true
    state.error=null

})
.addCase(addToCart.fulfilled,(state,action)=>{
    state.loading=false;
    state.cart=action.payload
})
.addCase(addToCart.rejected,(state,action)=>{
    state.loading=false;
    state.error=action.payload
})
    }
})

export default CartSlice.reducer