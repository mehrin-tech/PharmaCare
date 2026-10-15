
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notifications/my");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notifications"
      );
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/notifications/${notificationId}/read`
      );
      return response.data.notification;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark as read"
      );
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await api.patch("/notifications/read-all");
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark all as read"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications || [];
        state.unreadCount = action.payload.unreadCount || 0;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = action.payload;
        const index = state.notifications.findIndex(
          (item) => item._id === notification._id
        );

        if (index !== -1) {
          const wasUnread = !state.notifications[index].isRead;
          state.notifications[index] = notification;

          if (wasUnread) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
        }
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((item) => ({
          ...item,
          isRead: true,
        }));
        state.unreadCount = 0;
      });
  },
});

export default notificationSlice.reducer;
