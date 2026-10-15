import MedicineCard from "./PharmacyMedicineCard";

const MedicineGrid = ({
  medicines,
  onAddToCart,
  onViewDetails,
}) => {

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-2
      "
    >

      {medicines.map((medicine) => (

        <MedicineCard
          key={medicine._id}
          medicine={medicine}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />

      ))}

    </div>
  );
};

export default MedicineGrid;
