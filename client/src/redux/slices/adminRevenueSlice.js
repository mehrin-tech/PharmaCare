
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch admin revenue report
export const getRevenueReport = createAsyncThunk(
  "adminRevenue/getRevenueReport",
  async (period = "Monthly", { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/revenue", {
        params: { period },
      });

      return response.data.report;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch revenue report"
      );
    }
  }
);



const initialState = {
  report: {
    totalDeliveredOrders: 0,
    totalSales: 0,
    totalDeliveryFees: 0,
    platformCommission: 0,
    pharmacyEarnings: 0,
    commissionRate: "0%",
    pharmacies: [],
    revenueTrend: [],
    paymentMethodBreakdown: [],
    period: "Monthly",
  },
  loading: false,
  error: null,
};

const adminRevenueSlice = createSlice({
  name: "adminRevenue",
  initialState,

  reducers: {
    clearRevenueError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH PENDING
      .addCase(getRevenueReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // FETCH SUCCESS
      .addCase(getRevenueReport.fulfilled, (state, action) => {
        state.loading = false;

        state.report = {
          ...initialState.report,
          ...action.payload,
          pharmacies: action.payload?.pharmacies || [],
          revenueTrend: action.payload?.revenueTrend || [],
          paymentMethodBreakdown:
            action.payload?.paymentMethodBreakdown || [],
        };
      })

      // FETCH ERROR
      .addCase(getRevenueReport.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch revenue report";
      });
  },
});

export const { clearRevenueError } = adminRevenueSlice.actions;

export default adminRevenueSlice.reducer;
