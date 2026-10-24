import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import AdminSidebar from '../../components/admin/AdminSidebar'
import TopNavbar from '../../components/customer/TopNavbar'
import OrderStats from '../../components/admin/OrderMonitoring/OrderStats'
import OrderTable from '../../components/admin/OrderMonitoring/OrderTable'
import OrderDetailsModal from '../../components/admin/OrderMonitoring/OrderDetailsModal'
import { getAllAdminOrders ,getAdminOrderStatistics,getAdminOrderDetails} from '../../redux/slices/adminOrderSlice'
const OrderMonitoring = () => {
    const dispatch=useDispatch()
    const {
  orders = [],
  ordersLoading,
  ordersError,
} = useSelector((state) => state.adminOrder || {});

const [selectedOrder, setSelectedOrder] = useState(null);
    useEffect(()=>{
        dispatch(getAllAdminOrders())
        dispatch(getAdminOrderStatistics())

    },[dispatch])
  return (
    <div className="min-h-screen bg-[#F7F9FA] md:flex">
        <AdminSidebar/>
        <main className="flex-1 min-w-0">

             <TopNavbar/>
              <OrderStats/>
              <OrderTable
               orders={orders}
  loading={ordersLoading}
  error={ordersError}
  onView={setSelectedOrder} />
  <OrderDetailsModal
  order={selectedOrder}
  onClose={() => setSelectedOrder(null)}
/>

        </main>
       
     
    </div>
  )
}

export default OrderMonitoring
