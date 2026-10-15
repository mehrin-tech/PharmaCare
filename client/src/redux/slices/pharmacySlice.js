import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import Pharmacies from "../../pages/Customer/Pharmacies";
export const getNearByPharmacies=createAsyncThunk(
    'pharmacy/getNearByPharmacies',
    async(_,{rejectWithValue})=>{
        try{
            const response=await api.get('/pharmacy/nearby')
             console.log("PHARMACIES:", response.data);

             return response.data

        }catch(error){

        console.log("PHARMACY ERROR:", error);

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch pharmacies"
      );
        }
    }
)

const pharmacySlice=createSlice({
    name:'pharmacy',
    initialState:{
        Pharmacies:[],
        loading:false,
        error:null,
    },
    reducers:{},

    extraReducers:(builder)=>{
        builder
           .addCase(getNearByPharmacies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getNearByPharmacies.fulfilled, (state, action) => {
        state.loading = false;

        state.Pharmacies =
          action.payload.pharmacies || [];
      })

      .addCase(getNearByPharmacies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export default pharmacySlice.reducer;