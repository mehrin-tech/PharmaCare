import { useState ,useEffect} from "react";
import api from '../../services/api'
import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";
import SearchHero from "../../components/customer/SearchHero";
import NearByPharmacies from "../../components/customer/NearByPharmaciesDashboard";
import OrderTracking from "../../components/customer/OrderTracking";
import Categories from '../../components/customer/BrowserCategories'
import PharmacyCards from '../../components/customer/NearByPharmacyCards'
import QuickActions from '../../components/customer/QuickActions'
import RecentOrders from '../../components/customer/RecentOrders'
export default function CustomerDashboard() {
  const [sidebarOpen,setSidebarOpen]=useState(false)
const [orders,setOrders]=useState([])
  const [order,setOrder]=useState(null)
   const [nearByPharmacies, setNearByPharmacies] = useState([]);
  const [pharmacyLoading, setPharmacyLoading] = useState(true);
const [pharmacyError, setPharmacyError] = useState("");
  useEffect(()=>{
    const fetchOrders= async()=>{
      try{
        const response=await api.get('/orders/my')
        console.log("Orders response:", response.data);
        const orders=response.data.orders || []
        setOrders(orders)

        if(orders.length>0){
          setOrder(orders[0])
        }

      }catch(error){
        console.error('Orders fetch error:',error.response?.data  || error.message)

      }
    }
    fetchOrders()
  },[])
   useEffect(() => {
    const fetchNearByPharmacies = async () => {
      try {
        const response = await api.get("/pharmacy/nearby");

        console.log(
          "Nearby pharmacies:",
          response.data
        );

        setNearByPharmacies(
          response.data.pharmacies || []
        );
      } catch (error) {
        console.error(
          "Nearby pharmacy fetch error:",
          error.response?.data || error.message
        );
      } finally {
        setPharmacyLoading(false);
      }
    };

    fetchNearByPharmacies();
  }, []);
  return (
    <div className="min-h-screen bg-[#F7F9FA] flex text-[#102A43]">

      {/* Sidebar */}
      <Sidebar  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      {/* Main Area */}
      <div className="flex-1 min-w-0">

        {/* Top Navbar */}
        <TopNavbar setSidebarOpen={setSidebarOpen} className="cursor-pointer" />

        {/* Dashboard Content */}
        <main className="p-3 sm:p-4">

          {/* Hero + Nearby Pharmacies */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-1
              lg:grid-cols-[minmax(0,1fr)_185px]
              gap-3
            "
          >

            {/* Search Hero */}
            <SearchHero />

            {/* Nearby Pharmacies */}
            <NearByPharmacies pharmacies={nearByPharmacies} 
             loading={pharmacyLoading}
             error={pharmacyError}
             
            />
            </div>
       <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-1
              lg:grid-cols-[minmax(0,1fr)_185px]
              gap-3
            "
          >  

{order && (
  <div className="mt-3">
     <OrderTracking orderId={order._id} orderStatus={order.orderStatus} />
    </div>
)}
<QuickActions/>
</div>

<Categories/>
<div
  className="
    grid
    grid-cols-1
    lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
    gap-3
    mt-3
  "
>
<PharmacyCards 
pharmacies={nearByPharmacies}
loading={pharmacyLoading}
error={pharmacyError}
/>

<RecentOrders orders={orders}/>
   </div>      

        </main>

      </div>

    </div>
  );
}