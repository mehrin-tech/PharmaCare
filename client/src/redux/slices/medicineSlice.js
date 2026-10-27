import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'
//fetch medicines 
export const fetchMyMedicines = createAsyncThunk(
    'medicines/fetchMyMedicines',
    async ({page=1,limit=10}={}, { rejectWithValue }) => {
        try {
            const response = await api.get('/medicines/my',{
                params:{page,limit}
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to fetch medicines")
        }
    }
)

export const updateMedicine = createAsyncThunk(
    "medicines/updateMedicine",
    async ({ medicineId, medicineData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/medicines/${medicineId}`,
                medicineData
            )
            return response.data.medicine || response.data.updateMedicine || response.data

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to update medicine")

        }
    }
)
export const deleteMedicine = createAsyncThunk(
    "medicines/deleteMedicine",
    async (medicineId, { rejectWithValue }) => {
        try {
            await api.delete(`/medicines/${medicineId}`);

            // Delete successful aayal medicine ID return cheyyuka
            return medicineId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete medicine"
            );
        }
    }
);

const medicineSlice = createSlice({
    name: 'medicines',
    initialState: {
        medicines: [],
        loading: false,
        error: null,
        pagination: {
  currentPage: 1,
  totalPages: 0,
 
  totalOrders: 0,
  limit: 10,
  hasNextPage: false,
  hasPrevPage: false,
},
    },
    reducers: {
        clearMedicineError: (state) => {
            state.error = null
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchMyMedicines.pending, (state) => {
            state.loading = true
            state.error = null
        })
         .addCase(fetchMyMedicines.fulfilled, (state, action) => {
  state.loading = false;

  const payload = action.payload;

  state.medicines = Array.isArray(payload?.medicines)
    ? payload.medicines
    : [];

  state.pagination = payload?.pagination || state.pagination;

  state.error = null;
})
            .addCase(fetchMyMedicines.rejected, (state, action) => {
                state.loading = false
                state.error = typeof action.payload === 'string' ? action.payload : 'failed to fetch medicines'
            })
            .addCase(updateMedicine.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updateMedicine.fulfilled, (state, action) => {
                state.loading = false;
                const updatedMedicine = action.payload

                if (!updatedMedicine?._id) return

                state.medicines = state.medicines.map((medicine) =>
                    medicine._id === updatedMedicine._id ? updatedMedicine : medicine)
                state.error = null
            })
            .addCase(updateMedicine.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    typeof action.payload === "string"
                        ? action.payload
                        : "Failed to update medicine";
            })
            .addCase(deleteMedicine.pending, (state) => {
                state.error = null;
            })

        .addCase(deleteMedicine.fulfilled, (state, action) => {
            state.medicines = state.medicines.filter(
                (medicine) => medicine._id !== action.payload
            )

            state.error = null;
        })

        .addCase(deleteMedicine.rejected, (state, action) => {
            state.error =
                typeof action.payload === "string"
                    ? action.payload
                    : "Failed to delete medicine";
        });

}
})

export const { clearMedicineError } = medicineSlice.actions;

export default medicineSlice.reducer;