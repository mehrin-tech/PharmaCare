import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from '../../services/api'


export const getMyPrescriptions=createAsyncThunk(
    'prescription/getMyPrescriptions',
    async(_,{rejectWithValue})=>{
        try{
            const response=await api.get("/prescriptions/my")
            return response.data


        }catch(error){
             return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch prescriptions"
      );

        }
    }
)

export const uploadPrescription = createAsyncThunk(
  "prescription/uploadPrescription",
  async (
    { file, medicineId, pharmacyId },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("prescription", file);
      formData.append("medicineId", medicineId);
      formData.append("pharmacyId", pharmacyId);

      const response = await api.post(
        "/prescriptions",
        formData,
        { headers: { "Content-Type": undefined } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Prescription upload failed"
      );
    }
  }
);

// FETCH PHARMACY PENDING PRESCRIPTIONS
export const getPendingPrescriptions = createAsyncThunk(
  "prescription/getPendingPrescriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/prescriptions/pending");
      return response.data.prescriptions || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch pending prescriptions"
      );
    }
  }
);

// APPROVE PRESCRIPTION
export const approvePrescription = createAsyncThunk(
  "prescription/approvePrescription",
  async (prescriptionId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/prescriptions/${prescriptionId}/approve`
      );

      return response.data.prescription;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to approve prescription"
      );
    }
  }
);
// REJECT PRESCRIPTION
export const rejectPrescription = createAsyncThunk(
  "prescription/rejectPrescription",
  async ({ prescriptionId, rejectionReason }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/prescriptions/${prescriptionId}/reject`,
        { rejectionReason }
      );

      return response.data.prescription;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to reject prescription"
      );
    }
  }
);

export const getAllPharmacyPrescriptions = createAsyncThunk(
  "prescription/getAllPharmacyPrescriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/prescriptions/pharmacy/all");
      return response.data.prescriptions || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch prescriptions"
      );
    }
  }
);

const initialState = {
  // Customer
  prescriptions: [],
  loading: false,
  uploadLoading: false,
  error: null,
  uploadError: null,

  // Pharmacy
  pendingPrescriptions: [],
  allPharmacyPrescriptions: [],
  pendingLoading: false,
  actionLoading: false,
  pendingError: null,
  actionError: null,
};

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,

  reducers: {
    clearPrescriptionError: (state) => {
      state.error = null;
      state.uploadError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET PRESCRIPTIONS
      .addCase(getMyPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getMyPrescriptions.fulfilled,
        (state, action) => {
          state.loading = false;

          state.prescriptions =
            action.payload.prescriptions || [];
        }
      )

      .addCase(
        getMyPrescriptions.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch prescriptions";
        }
      )

      // UPLOAD PRESCRIPTION
      .addCase(uploadPrescription.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })

      .addCase(
        uploadPrescription.fulfilled,
        (state, action) => {
          state.uploadLoading = false;

          if (action.payload.prescription) {
            state.prescriptions.unshift(
              action.payload.prescription
            );
          }
        }
      )

      .addCase(
        uploadPrescription.rejected,
        (state, action) => {
          state.uploadLoading = false;

          state.uploadError =
            action.payload ||
            "Prescription upload failed";
        }
      )
    // GET PENDING PRESCRIPTIONS
.addCase(getPendingPrescriptions.pending, (state) => {
  state.pendingLoading = true;
  state.pendingError = null;
})
.addCase(getPendingPrescriptions.fulfilled, (state, action) => {
  state.pendingLoading = false;
  state.pendingPrescriptions = action.payload;
})
.addCase(getPendingPrescriptions.rejected, (state, action) => {
  state.pendingLoading = false;
  state.pendingError =
    action.payload || "Failed to fetch pending prescriptions";
})

// APPROVE PRESCRIPTION
.addCase(approvePrescription.pending, (state) => {
  state.actionLoading = true;
  state.actionError = null;
})
.addCase(approvePrescription.fulfilled, (state, action) => {
  state.actionLoading = false;

  state.allPharmacyPrescriptions =
    state.allPharmacyPrescriptions.map((item) =>
      item._id === action.payload._id
        ? {
            ...item,
            status: action.payload.status,
            rejectionReason: action.payload.rejectionReason,
            verifiedBy: action.payload.verifiedBy,
            verifiedAt: action.payload.verifiedAt,
          }
        : item
    );
})
.addCase(approvePrescription.rejected, (state, action) => {
  state.actionLoading = false;
  state.actionError =
    action.payload || "Failed to approve prescription";
})

// REJECT PRESCRIPTION
.addCase(rejectPrescription.pending, (state) => {
  state.actionLoading = true;
  state.actionError = null;
})
.addCase(rejectPrescription.fulfilled, (state, action) => {
  state.actionLoading = false;

  state.allPharmacyPrescriptions =
    state.allPharmacyPrescriptions.map((item) =>
      item._id === action.payload._id
        ? {
            ...item,
            status: action.payload.status,
            rejectionReason: action.payload.rejectionReason,
            verifiedBy: action.payload.verifiedBy,
            verifiedAt: action.payload.verifiedAt,
          }
        : item
    );
})
.addCase(rejectPrescription.rejected, (state, action) => {
  state.actionLoading = false;
  state.actionError =
    action.payload || "Failed to reject prescription";
})


// GET ALL PHARMACY PRESCRIPTIONS
.addCase(getAllPharmacyPrescriptions.pending, (state) => {
  state.pendingLoading = true;
  state.pendingError = null;
})
.addCase(getAllPharmacyPrescriptions.fulfilled, (state, action) => {
  state.pendingLoading = false;
  state.allPharmacyPrescriptions = action.payload;
})
.addCase(getAllPharmacyPrescriptions.rejected, (state, action) => {
  state.pendingLoading = false;
  state.pendingError =
    action.payload || "Failed to fetch prescriptions";
})
  },
});

export const {
  clearPrescriptionError,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
