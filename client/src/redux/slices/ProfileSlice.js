
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchMyProfile = createAsyncThunk(
  "profile/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch profile"
      );
    }
  }
);

// Update pharmacy profile

export const updatePharmacyProfile = createAsyncThunk(
  "profile/updatePharmacyProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        "/profile/pharmacy",
        formData
      );

      // Fetch updated profile
      const profileResponse = await api.get("/profile");

      return profileResponse.data.profile;
    } catch (error) {
      console.error("Update status:", error.response?.status);
      console.error("Update response:", error.response?.data);
      console.error("Update error:", error.message);

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update pharmacy profile"
      );
    }
  }
);


const initialState = {
  user: null,
  pharmacy: null,
  loading: false,
   updating: false,
  error: null,
  updateSuccess: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.pharmacy = null;
      state.loading = false;
       state.updating = false;
      state.error = null;
      state.updateSuccess = false;
    },
     resetUpdateStatus: (state) => {
      state.updateSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.pharmacy = action.payload?.pharmacy || null;
      })

      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load profile";
      })
           // Update profile
      .addCase(updatePharmacyProfile.pending, (state) => {
        state.updating = true;
        state.updateSuccess = false;
        state.error = null;
      })
      .addCase(updatePharmacyProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.user = action.payload?.user || state.user;
        state.pharmacy = action.payload?.pharmacy || state.pharmacy;
      })
      .addCase(updatePharmacyProfile.rejected, (state, action) => {
        state.updating = false;
        state.updateSuccess = false;
        state.error = action.payload || "Failed to update profile";
      });
  },
});

export const { clearProfile,resetUpdateStatus } = profileSlice.actions;

export default profileSlice.reducer;
