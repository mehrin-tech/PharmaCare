
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch Admin Analytics
export const getAdminAnalytics = createAsyncThunk(
  "adminAnalytics/getAdminAnalytics",
  async (period = "Monthly", { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/analytics", {
        params: { period },
      });

      return response.data.analytics;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch admin analytics"
      );
    }
  }
);

const initialState = {
  analytics: {
    customers: {
      total: 0,
      active: 0,
    },

    customerGrowth: [],
    customerGrowthPeriod: "Monthly",

    pharmacies: {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    },

    orders: {
      total: 0,
      delivered: 0,
      pending: 0,
      cancelled: 0,
    },

    revenue: {
      totalRevenue: 0,
      todayRevenue: 0,
      monthlyRevenue: 0,
      platformCommission: 0,
      commissionRate: "0%",
    },
  },

  loading: false,
  error: null,
};

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState,

  reducers: {
    clearAnalyticsError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // API request started
      .addCase(getAdminAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API request successful
      .addCase(getAdminAnalytics.fulfilled, (state, action) => {
        state.loading = false;

        state.analytics = {
          ...initialState.analytics,
          ...action.payload,

          customers: {
            ...initialState.analytics.customers,
            ...action.payload?.customers,
          },

          pharmacies: {
            ...initialState.analytics.pharmacies,
            ...action.payload?.pharmacies,
          },

          orders: {
            ...initialState.analytics.orders,
            ...action.payload?.orders,
          },

          revenue: {
            ...initialState.analytics.revenue,
            ...action.payload?.revenue,
          },

          customerGrowth: action.payload?.customerGrowth || [],
        };
      })

      // API request failed
      .addCase(getAdminAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export const { clearAnalyticsError } = adminAnalyticsSlice.actions;

export default adminAnalyticsSlice.reducer;
