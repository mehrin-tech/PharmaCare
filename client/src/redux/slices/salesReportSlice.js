import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getSalesReport=createAsyncThunk(
    'salesReport/getSalesReport',
    async(_,{rejectWithValue})=>{
        try{
            const response=await api.get('/pharmacy/sales')
            return response.data;

        }catch(error){
              console.error("Sales report API error:", error.response?.status);
  console.error("Sales report API response:", error.response?.data);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch sales report")

        }
    }
)

const initialState = {
  pharmacy: null,
 report: {
  totalSales: 0,
  totalOrders: 0,
  totalMedicinesSold: 0,
  todaySales: 0,
  monthlySales: 0,
  salesTrend: [],
},
  loading: false,
  error: null,
};

const salesReportSlice = createSlice({
  name: "salesReport",
  initialState,
  reducers: {
    clearSalesReportError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesReport.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;

  state.pharmacy = action.payload.pharmacy || null;

  state.report = {
    ...state.report,
    ...action.payload.report,
    salesTrend: action.payload.report?.salesTrend || [],
  };
})
      .addCase(getSalesReport.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch sales report";
      });
  },
});

export const { clearSalesReportError } = salesReportSlice.actions;

export default salesReportSlice.reducer;