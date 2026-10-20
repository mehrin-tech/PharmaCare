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

export const getAllPharmacies=createAsyncThunk(
  'pharmacy/getAllPharmacies',
  async(_,{rejectWithValue})=>{
    try{
      const response=await api.get('/admin/pharmacies')
        console.log("ALL PHARMACIES:", response.data);
      return response.data;

    }catch(error){
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch all pharmacies"
      );

    }
  }
)

const pharmacySlice=createSlice({
    name:'pharmacy',
    initialState:{
        Pharmacies:[],
        allPharmacies:[],
        loading:false,
        allPharmaciesLoading: false,
        error:null,
        allPharmaciesError: null,
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
      })
      .addCase(getAllPharmacies.pending, (state) => {
  state.allPharmaciesLoading = true;
  state.allPharmaciesError = null;
})
.addCase(getAllPharmacies.fulfilled, (state, action) => {
  state.allPharmaciesLoading = false;

  const payload = action.payload;

  state.allPharmacies = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.pharmacies)
      ? payload.pharmacies
      : [];
})
.addCase(getAllPharmacies.rejected, (state, action) => {
  state.allPharmaciesLoading = false;
  state.allPharmaciesError =
    action.payload || "Failed to fetch all pharmacies";
});
    }
})

export default pharmacySlice.reducer;