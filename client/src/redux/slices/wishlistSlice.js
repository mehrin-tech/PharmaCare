import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// ================= FETCH WISHLIST =================

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/wishlist/my");

      return response.data.wishlist;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch wishlist"
      );
    }
  }
);

// ================= ADD TO WISHLIST =================

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, thunkAPI) => {
    try {
      const response = await api.post("/wishlist", {
        productId,
      });

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to add product to wishlist"
      );
    }
  }
);

// ================= REMOVE FROM WISHLIST =================

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, thunkAPI) => {
    try {
      const response = await api.delete(
        `/wishlist/${productId}`
      );

      return {
        productId,
        data: response.data,
      };

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove product from wishlist"
      );
    }
  }
);

// ================= CLEAR WISHLIST =================

export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, thunkAPI) => {
    try {
      const response = await api.delete("/wishlist");

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to clear wishlist"
      );
    }
  }
);

// ================= SLICE =================

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // ================= FETCH =================

    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload;

        state.error = null;
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });


    // ================= ADD =================

    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;

        state.items.push(action.payload);

        state.error = null;
      })

      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });


    // ================= REMOVE =================

    builder
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter(
          (item) =>
            item.medicine._id !== action.payload.productId
        );

        state.error = null;
      })

      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });


    // ================= CLEAR =================

    builder
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(clearWishlist.fulfilled, (state) => {
        state.loading = false;

        state.items = [];

        state.error = null;
      })

      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;