import { useNavigate } from "react-router-dom";
import { Store, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

const PartnerWithUs = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F0FBF7] px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

        {/* Content */}
        <div>
          <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0F9D74]">
            Pharmacy Partners
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-[#102A43] sm:text-4xl">
            Grow Your Pharmacy Business With{" "}
            <span className="text-[#0F9D74]">PharmaCare</span>
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-gray-600">
            Join PharmaCare to connect with more customers, manage your
            inventory, and handle medicine orders through one convenient
            platform.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Store className="text-[#0F9D74]" size={20} />
              <span>Manage your pharmacy online</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <TrendingUp className="text-[#0F9D74]" size={20} />
              <span>Reach more potential customers</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <ShieldCheck className="text-[#0F9D74]" size={20} />
              <span>License verification and admin approval</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/pharmacy/register")}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0F9D74] px-6 py-3 font-semibold text-white transition hover:bg-[#0b805e]"
          >
            Register Your Pharmacy
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Highlight Card */}
        <div className="rounded-3xl border border-[#D7F2E7] bg-white p-8 shadow-sm sm:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F8F2]">
            <Store size={32} className="text-[#0F9D74]" />
          </div>

          <h3 className="mt-6 text-2xl font-bold text-[#102A43]">
            Become a PharmaCare Partner
          </h3>

          <p className="mt-3 leading-7 text-gray-600">
            Register your pharmacy, submit your license details, and
            complete the verification and approval process to get started.
          </p>

          <div className="mt-6 rounded-xl bg-[#F0FBF7] p-4">
            <p className="text-sm font-semibold text-[#0F9D74]">
              Getting started is simple
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Register → Verify → Admin Approval
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnerWithUs;