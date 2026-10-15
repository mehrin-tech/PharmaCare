
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inventory: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,

  reducers: {
    // Medicine list inventory-yilekku set cheyyan
    setInventory: (state, action) => {
      state.inventory = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // Stock quantity update cheyyan
    adjustStock: (state, action) => {
      const { medicineId, quantity } = action.payload;

      const medicine = state.inventory.find(
        (item) => item._id === medicineId
      );

      if (medicine) {
        const newStock = Number(medicine.stock) + Number(quantity);

        if (newStock >= 0) {
          medicine.stock = newStock;
        }
      }
    },

    // Stock add cheyyan
    addStock: (state, action) => {
      const { medicineId, quantity } = action.payload;

      const medicine = state.inventory.find(
        (item) => item._id === medicineId
      );

      if (medicine && Number(quantity) > 0) {
        medicine.stock =
          Number(medicine.stock || 0) + Number(quantity);
      }
    },

    // Inventory-il ninnu medicine remove cheyyan
    removeInventoryMedicine: (state, action) => {
      state.inventory = state.inventory.filter(
        (medicine) => medicine._id !== action.payload
      );
    },

    clearInventoryError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setInventory,
  adjustStock,
  addStock,
  removeInventoryMedicine,
  clearInventoryError,
} = inventorySlice.actions;

export default inventorySlice.reducer;
