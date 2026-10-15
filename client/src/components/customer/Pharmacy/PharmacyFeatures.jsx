import { ShieldCheck, Truck, CreditCard, RotateCcw, Headphones } from "lucide-react";

const features = [
  [ShieldCheck, "100% Genuine Medicines"],
  [Truck, "Fast Delivery in 30 Mins"],
  [CreditCard, "Secure Payments"],
  [RotateCcw, "Easy Returns"],
  [Headphones, "Pharmacist Support"],
];

const PharmacyFeatures = ({ pharmacy }) => {
  if (!pharmacy) return null;

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-3">
      <h2 className="mb-2 text-[13px] font-semibold text-[#0F9D74]">
        Why choose {pharmacy.pharmacyName}?
      </h2>
      <ul className="space-y-2">
        {features.map(([Icon, label]) => (
          <li key={label} className="flex items-center gap-2 text-[10px] text-gray-600">
            <Icon size={13} className="shrink-0 text-[#0F9D74]" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PharmacyFeatures;
