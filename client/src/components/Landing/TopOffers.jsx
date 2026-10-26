import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import paracetamolImg from "../../assets/paracetamol.png";
import HealthCareImg from "../../assets/HealthCare.png";
import PersonalCareIng from "../../assets/personalCare.png";
import SupplementsImg from "../../assets/supplements.png";

const offers = [
  {
    id: 1,
    label: "FLAT",
    discount: "20%",
    subtitle: "OFF",
    title: "On All Medicines",
    color: "bg-[#DDFBEA]",
    image: paracetamolImg,
  },
  {
    id: 2,
    label: "Up to",
    discount: "30%",
    subtitle: "OFF",
    title: "On Health Care",
    color: "bg-[#E2F7E9]",
    image: HealthCareImg,
  },
  {
    id: 3,
    label: "Up to",
    discount: "25%",
    subtitle: "OFF",
    title: "On Personal Care",
    color: "bg-[#FFF0EB]",
    image: PersonalCareIng,
  },
  {
    id: 4,
    label: "BUY 1 GET 1",
    discount: "FREE",
    subtitle: "",
    title: "On Supplements",
    color: "bg-[#F7F5EF]",
    image: SupplementsImg,
  },
  {
  id: 5,
  label: "FLAT",
  discount: "15%",
  subtitle: "OFF",
  title: "On Wellness Products",
  color: "bg-[#EAF3FF]",
  image: HealthCareImg,
},
{
  id: 6,
  label: "Up to",
  discount: "20%",
  subtitle: "OFF",
  title: "On Daily Essentials",
  color: "bg-[#F2EFFF]",
  image: PersonalCareIng,
},
{
  id: 7,
  label: "SPECIAL",
  discount: "10%",
  subtitle: "OFF",
  title: "On Health Care",
  color: "bg-[#E2F7E9]",
  image: HealthCareImg,
},
{
  id: 8,
  label: "BUY 1 GET 1",
  discount: "FREE",
  subtitle: "",
  title: "On Supplements",
  color: "bg-[#F7F5EF]",
  image: SupplementsImg,
},
{
  id: 9,
  label: "FLAT",
  discount: "25%",
  subtitle: "OFF",
  title: "On All Medicines",
  color: "bg-[#DDFBEA]",
  image: paracetamolImg,
},
{
  id: 10,
  label: "Up to",
  discount: "30%",
  subtitle: "OFF",
  title: "On Personal Care",
  color: "bg-[#FFF0EB]",
  image: PersonalCareIng,
},
{
  id: 11,
  label: "SPECIAL",
  discount: "15%",
  subtitle: "OFF",
  title: "On Health Care",
  color: "bg-[#E2F7E9]",
  image: HealthCareImg,
},
{
  id: 12,
  label: "FLAT",
  discount: "10%",
  subtitle: "OFF",
  title: "On Supplements",
  color: "bg-[#F7F5EF]",
  image: SupplementsImg,
},
];

const getVisibleCards = () => {
  if (typeof window === "undefined") return 4;

  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;

  return 4;
};

const TopOffers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(getVisibleCards);

  useEffect(() => {
    const handleResize = () => {
      const count = getVisibleCards();

      setVisibleCards(count);
      setCurrentSlide((prev) =>
        Math.min(prev, Math.max(0, offers.length - count))
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const maxSlide = Math.max(0, offers.length - visibleCards);

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(Math.max(index, 0), maxSlide));
  };

  return (
    <section
      id="offers"
      className="scroll-mt-20 bg-white px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-8xl">
        {/* Heading */}
        <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
          Top Offers for You
        </h2>

        {/* Offers Slider */}
        <div className="overflow-hidden">
          <div
            className="flex gap-3 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(${currentSlide} * (-${100 / visibleCards}% - ${12 / visibleCards}px)))`,
            }}
          >
            {offers.map((offer) => (
              <article
                key={offer.id}
                className={`${offer.color} group relative flex min-h-[112px] shrink-0 items-center justify-between gap-2 overflow-hidden rounded-xl p-3 transition-shadow duration-300 hover:shadow-md`}
                style={{
                  width: `calc((100% - ${
                    (visibleCards - 1) * 12
                  }px) / ${visibleCards})`,
                }}
              >
                {/* Offer Details */}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium text-gray-600">
                    {offer.label}
                  </p>

                  <h3 className="mt-1 text-xl font-extrabold leading-none text-[#0F9D74]">
                    {offer.discount}
                  </h3>

                  {offer.subtitle && (
                    <p className="mt-0.5 text-[10px] font-semibold text-[#0F9D74]">
                      {offer.subtitle}
                    </p>
                  )}

                  <p className="mt-1 text-[10px] leading-4 text-gray-700">
                    {offer.title}
                  </p>

                  <Link
                    to="/medicines"
                    className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#0F9D74] hover:underline"
                  >
                    Shop Now <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* Product Image */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="mt-4 flex items-center justify-center gap-3">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            aria-label="Previous offers"
            className="text-sm text-gray-500 transition hover:text-[#0F9D74] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ←
          </button>

          {/* Dynamic Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to offer slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-3 bg-[#0F9D74]"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => goToSlide(currentSlide + 1)}
            disabled={currentSlide >= maxSlide}
            aria-label="Next offers"
            className="text-sm text-gray-500 transition hover:text-[#0F9D74] disabled:cursor-not-allowed disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopOffers;