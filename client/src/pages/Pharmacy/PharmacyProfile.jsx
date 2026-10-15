
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PharmacyProfileHeader from '../../components/pharmacy/Profile/PharmacyProfileHeader'
import PharmacyProfileTabs from '../../components/pharmacy/Profile/PharmacyProfileTabs'
import PharmacyInfo from '../../components/pharmacy/Profile/PharmacyInfo'
import {fetchMyProfile} from '../../redux/slices/ProfileSlice'
import EditPharmacyProfileModal from '../../components/pharmacy/Profile/EditPharmacyProfileModal'
import PharmacyBusinessAddress from '../../components/pharmacy/Profile/PharmacyBusinessAddress'
import PharmacyLicenseVerification from '../../components/pharmacy/Profile/PharmacyLicenseVerification'
const PharmacyProfile = () => {
    const dispatch=useDispatch()
    const [activeTab,setActiveTab]=useState('info')
     const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(()=>{
        dispatch(fetchMyProfile())
    },[dispatch])
  return (
     <div className="space-y-6">
      <PharmacyProfileHeader />

      <PharmacyProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {activeTab === "info" && (
          <PharmacyInfo
            onEdit={() => setIsEditOpen(true)}
          />
        )}

        {activeTab === "address" && (
          <PharmacyBusinessAddress />
        )}

        {activeTab === "verification" && (
         <PharmacyLicenseVerification />
        )}
      </div>

    </div>
  )
}

export default PharmacyProfile
