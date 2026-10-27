import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import AdminSidebar from '../../components/admin/AdminSidebar'
import TopNavbar from '../../components/customer/TopNavbar'
import OrderStats from '../../components/admin/OrderMonitoring/OrderStats'
import OrderTable from '../../components/admin/OrderMonitoring/OrderTable'
import OrderDetailsModal from '../../components/admin/OrderMonitoring/OrderDetailsModal'
import { getAllAdminOrders ,getAdminOrderStatistics,getAdminOrderDetails} from '../../redux/slices/adminOrderSlice'
import Pagination from '../../components/Pagination/Pagination'
const OrderMonitoring = () => {
    const dispatch=useDispatch()
    const {
  orders = [],
  ordersLoading,
  ordersError,
  pagination={}
} = useSelector((state) => state.adminOrder || {});

const [selectedOrder, setSelectedOrder] = useState(null);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const limit = 6;
    useEffect(()=>{
        dispatch(getAllAdminOrders({page:currentPage,limit}))
        dispatch(getAdminOrderStatistics())

    },[dispatch,currentPage])
  return (
    <div className="min-h-screen bg-[#F7F9FA] lg:flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">

             <TopNavbar setSidebarOpen={setSidebarOpen} />
             <div className="px-4 pb-2 pt-6 sm:px-6 lg:px-8">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div className="flex items-center gap-2">
      

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Order Monitoring
        </h1>
      </div>

      <p className="mt-2 pl-3.5 text-sm text-gray-500 sm:text-base">
        Monitor and manage all customer orders across PharmaCare.
      </p>
    </div>

   
  </div>
</div>
             
               <section className="mb-8">
            <OrderStats/>
        </section>
            
              <OrderTable
               orders={orders}
  loading={ordersLoading}
  error={ordersError}
  onView={setSelectedOrder} />
  <OrderDetailsModal
  order={selectedOrder}
  onClose={() => setSelectedOrder(null)}
/>
<Pagination
  currentPage={pagination.currentPage || currentPage}
  totalPages={pagination.totalPages || 0}
  totalItems={pagination.totalOrders || 0}
  limit={limit}
  onPageChange={setCurrentPage}
  loading={ordersLoading}
/>
        </main>
       
     
    </div>
  )
}

export default OrderMonitoring
