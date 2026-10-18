
// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import OrderFilters from "../../components/pharmacy/Orders/OrderFilters";
// import OrdersTable from "../../components/pharmacy/Orders/OrdersTable";
// import OrderDetailsModal from "../../components/pharmacy/Orders/OrderDetailsModal";
// import {
//   getPharmacyOrders,
//   updateOrderStatus,
// } from "../../redux/slices/orderSlice";

// const OrderManagement = () => {
//   const dispatch = useDispatch();

//   const {
//     pharmacyOrders = [],
//     pharmacyOrdersLoading,
//     pharmacyOrdersError,
//     orderActionLoading,
//   } = useSelector((state) => state.orders);

//   const [search, setSearch] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const [paymentFilter, setPaymentFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("");

//   const [selectedOrder, setSelectedOrder] = useState(null);


//   useEffect(() => {
//     dispatch(getPharmacyOrders());
//   }, [dispatch]);

//   const filteredOrders = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return pharmacyOrders.filter((order) => {
//       const matchesStatus =
//         activeTab === "all" || order.orderStatus === activeTab;

//       const matchesSearch = [
//         order.orderNumber,
//         order._id,
//         order.user?.name,
//         order.user?.email,
//       ].some((value) =>
//         String(value || "").toLowerCase().includes(query)
//       );

//       const matchesPayment =
//         paymentFilter === "all" ||
//         order.paymentStatus === paymentFilter;

//       const matchesDate =
//         !dateFilter ||
//         (order.createdAt &&
//           new Date(order.createdAt).toISOString().slice(0, 10) ===
//             dateFilter);

//       return (
//         matchesStatus &&
//         matchesSearch &&
//         matchesPayment &&
//         matchesDate
//       );
//     });
//   }, [pharmacyOrders, search, activeTab, paymentFilter, dateFilter]);

//   const handleUpdateStatus = async (orderId, status) => {
//     const result = await dispatch(
//       updateOrderStatus({ orderId, status })
//     );

//     if (updateOrderStatus.fulfilled.match(result)) {
//       dispatch(getPharmacyOrders());
//     }
//   };


  
// const handleViewOrder = (order) => {
//   setSelectedOrder(order);
// };

//   return (
//     <div className="space-y-6 p-4 md:p-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">
//           Order Management
//         </h1>
//         <p className="mt-1 text-sm text-gray-500">
//           Manage and track customer orders.
//         </p>
//       </div>

//       {pharmacyOrdersError && (
//         <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
//           {pharmacyOrdersError}
//         </p>
//       )}

//       <OrderFilters
//         orders={pharmacyOrders}
//         search={search}
//         onSearchChange={setSearch}
//         activeTab={activeTab}
//         onTabChange={setActiveTab}
//         paymentFilter={paymentFilter}
//         onPaymentFilterChange={setPaymentFilter}
//         dateFilter={dateFilter}
//         onDateFilterChange={setDateFilter}
//         onRefresh={() => dispatch(getPharmacyOrders())}
//         loading={pharmacyOrdersLoading}
//       />

//       <OrdersTable
//         orders={filteredOrders}
//         loading={pharmacyOrdersLoading}
//         actionLoading={orderActionLoading}
//         onView={handleViewOrder}
//         onUpdateStatus={handleUpdateStatus}
//       />
//       <OrderDetailsModal  order={selectedOrder}
//   onClose={() => setSelectedOrder(null)} />
//     </div>
//   );
// };

// export default OrderManagement;

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderFilters from "../../components/pharmacy/Orders/OrderFilters";
import OrdersTable from "../../components/pharmacy/Orders/OrdersTable";
import OrderDetailsModal from "../../components/pharmacy/Orders/OrderDetailsModal";

import {
  getPharmacyOrders,
  updateOrderStatus,
  confirmCashReceived
} from "../../redux/slices/orderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();

  const {
    pharmacyOrders = [],
    pharmacyOrdersLoading,
    pharmacyOrdersError,
    orderActionLoading,
  } = useSelector((state) => state.orders);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cashConfirmLoading, setCashConfirmLoading] = useState(false);
  const [cashConfirmError, setCashConfirmError] = useState("");

  useEffect(() => {
    dispatch(getPharmacyOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pharmacyOrders.filter((order) => {
      const matchesStatus =
        activeTab === "all" || order.orderStatus === activeTab;

      const matchesSearch = [
        order.orderNumber,
        order._id,
        order.user?.name,
        order.user?.email,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      const matchesPayment =
        paymentFilter === "all" ||
        order.paymentStatus === paymentFilter;

      const matchesDate =
        !dateFilter ||
        (order.createdAt &&
          new Date(order.createdAt).toISOString().slice(0, 10) ===
            dateFilter);

      return (
        matchesStatus &&
        matchesSearch &&
        matchesPayment &&
        matchesDate
      );
    });
  }, [
    pharmacyOrders,
    search,
    activeTab,
    paymentFilter,
    dateFilter,
  ]);

  const handleUpdateStatus = async (orderId, status) => {
    const result = await dispatch(
      updateOrderStatus({ orderId, status })
    );

    if (updateOrderStatus.fulfilled.match(result)) {
      dispatch(getPharmacyOrders());
    }
  };

//   const handleConfirmCashReceived = async (orderId) => {
//     const confirmed = window.confirm(
//       "Have you received the full cash payment for this delivered COD order?"
//     );

//     if (!confirmed) return;

//     setCashConfirmError("");
//     setCashConfirmLoading(true);

//     try {
//       // Connect this handler after creating the confirmCashReceived thunk.
//       // const result = await dispatch(confirmCashReceived(orderId));

//       // if (confirmCashReceived.fulfilled.match(result)) {
//       //   await dispatch(getPharmacyOrders());
//       // } else {
//       //   setCashConfirmError(
//       //     result.payload || "Failed to confirm cash payment."
//       //   );
//       // }

//       setCashConfirmError(
//         "Cash confirmation API is not connected yet. Complete the orderSlice thunk and backend route first."
//       );
//     } finally {
//       setCashConfirmLoading(false);
//     }
//   };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleConfirmCashReceived = async (orderId) => {
  const confirmed = window.confirm(
    "Have you received the full cash payment for this delivered COD order?"
  );

  if (!confirmed) return;

  setCashConfirmError("");

  const result = await dispatch(confirmCashReceived(orderId));

  if (confirmCashReceived.fulfilled.match(result)) {
    dispatch(getPharmacyOrders());
  } else {
    setCashConfirmError(
      result.payload || "Failed to confirm cash payment"
    );
  }
};
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Order Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track customer orders.
        </p>
      </div>

      {pharmacyOrdersError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {pharmacyOrdersError}
        </p>
      )}

      {cashConfirmError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {cashConfirmError}
        </p>
      )}

      <OrderFilters
        orders={pharmacyOrders}
        search={search}
        onSearchChange={setSearch}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        paymentFilter={paymentFilter}
        onPaymentFilterChange={setPaymentFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        onRefresh={() => dispatch(getPharmacyOrders())}
        loading={pharmacyOrdersLoading}
      />

      <OrdersTable
        orders={filteredOrders}
        loading={pharmacyOrdersLoading}
        actionLoading={orderActionLoading || cashConfirmLoading}
        onView={handleViewOrder}
        onUpdateStatus={handleUpdateStatus}
        onConfirmCashReceived={handleConfirmCashReceived}
      />

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrderManagement;

