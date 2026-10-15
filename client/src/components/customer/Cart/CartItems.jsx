import React from "react";
import CartItem from "./CartItem";
import CartPharmacyGroup from "./CartPharmacyGroup";
const CartItems = ({
  items = [],
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  
  if (items.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg p-8 mt-3 text-center">
        <p className="text-sm text-gray-500">
          Your cart is empty
        </p>
      </div>
    );
  }
  //grp medicines by pharmacy

  const groupedItems=items.reduce((groups,item)=>{
    const pharmacy=item.medicine?.pharmacy
    if(!pharmacy) return groups

     const pharmacyId = pharmacy._id;

    if(!groups[pharmacyId]){
        groups[pharmacyId]={
            pharmacy,
            items:[]
        }
    }
    groups[pharmacyId].items.push(item)

    return groups
  },{})

  return (
   <div className="mt-3 space-y-4">
      {Object.values(groupedItems).map((group) => (
        <CartPharmacyGroup
          key={group.pharmacy._id}
          pharmacy={group.pharmacy}
          items={group.items}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartItems;