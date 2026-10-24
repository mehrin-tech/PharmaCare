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

export const rejectPharmacy = createAsyncThunk(
  "pharmacy/rejectPharmacy",
  async ({ pharmacyId, reason }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/pharmacies/${pharmacyId}/reject`,
        { reason }
      );

      return {
        pharmacyId,
        ...response.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to reject pharmacy"
      );
    }
  }
);
export const approvePharmacy=createAsyncThunk(
  'pharmacy/approvePharmacy',
  async(pharmacyId,{rejectWithValue})=>{
    try{
      const response=await api.patch(`/admin/pharmacies/${pharmacyId}/approve`)
      return{
        pharmacyId,
        ...response.data,
      }

    }catch(error){
       return rejectWithValue(
    error.response?.data?.message ||
      "Failed to approve pharmacy"
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
}).addCase(rejectPharmacy.fulfilled, (state, action) => {
  const pharmacyId = action.payload.pharmacyId;

  state.allPharmacies = state.allPharmacies.map((pharmacy) =>
    pharmacy._id === pharmacyId
      ? {
          ...pharmacy,
          approvalStatus: "rejected",
          isActive: false,
        }
      : pharmacy
  );
})
.addCase(approvePharmacy.pending, (state) => {
  state.error = null;
})

.addCase(approvePharmacy.fulfilled, (state, action) => {
  const pharmacyId = action.payload.pharmacyId;

  state.allPharmacies = state.allPharmacies.map((pharmacy) =>
    pharmacy._id === pharmacyId
      ? {
          ...pharmacy,
          approvalStatus: "approved",
          isActive: true,
        }
      : pharmacy
  );
})

.addCase(approvePharmacy.rejected, (state, action) => {
  state.error =
    action.payload || "Failed to approve pharmacy";
})
    }
})

export default pharmacySlice.reducer;