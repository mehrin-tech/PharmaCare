import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../redux/slices/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    notifications = [],
    unreadCount = 0,
    loading,
    error,
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await dispatch(
          markNotificationAsRead(notification._id)
        ).unwrap();
      }

      if (notification.order?._id) {
        navigate(`/orders/${notification.order._id}`);
      }
    } catch (err) {
      console.error("Failed to update notification:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await dispatch(markAllNotificationsAsRead()).unwrap();
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Stay updated on your orders and activities.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-sm font-medium text-[#0F9D74] hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm">
            Loading notifications...
          </div>
        ) : error ? (
          <div className="rounded-xl bg-white p-8 text-center text-red-500 shadow-sm">
            {typeof error === "string"
              ? error
              : "Failed to load notifications."}
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <h2 className="font-semibold text-gray-700">
              No notifications yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Your notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            {notifications.map((notification) => (
              <button
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`flex w-full items-start gap-3 border-b border-gray-100 p-5 text-left transition hover:bg-[#F0FBF7] last:border-b-0 ${
                  !notification.isRead
                    ? "bg-[#F0FBF7]"
                    : "bg-white"
                }`}
              >
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                    !notification.isRead
                      ? "bg-[#0F9D74]"
                      : "bg-gray-200"
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {notification.title}
                    </h3>

                    <span className="text-xs text-gray-400">
                      {notification.createdAt
                        ? new Date(
                            notification.createdAt
                          ).toLocaleString()
                        : ""}
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {notification.message}
                  </p>

                  {!notification.isRead && (
                    <span className="mt-2 inline-block text-xs font-medium text-[#0F9D74]">
                      Unread
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;