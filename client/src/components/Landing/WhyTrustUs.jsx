const trustFeatures = [
  {
    id: 1,
    icon: (
      <svg
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "100% Genuine Products",
    description: (
      <>
        We ensure original &
        <br />
        high-quality medicines.
      </>
    ),
  },
  {
    id: 2,
    icon: (
      <svg
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <circle cx="12" cy="15" r="1" />
      </svg>
    ),
    title: "Secure Payments",
    description: (
      <>
        Multiple payment options
        <br />
        for your convenience.
      </>
    ),
  },
  {
    id: 3,
    icon: (
      <svg
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 9 6 6m0-6-6 6" />
      </svg>
    ),
    title: "24/7 Support",
    description: (
      <>
        Our support team is
        <br />
        always here to help you.
      </>
    ),
  },
  {
    id: 4,
    icon: (
      <svg
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path d="m10 15 1.5 1.5L14 14" />
      </svg>
    ),
    title: "Privacy Protection",
    description: (
      <>
        Your data is safe &
        <br />
        protected with us.
      </>
    ),
  },
];

const WhyTrustUs = () => {
  return (
    <section
      id="why-trust-us"
      className="scroll-mt-20 bg-white px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-8xl">
        <div className="rounded-xl bg-[#0F9D74] px-5 py-8 text-white sm:px-8 sm:py-10">
          {/* Heading */}
          <h2 className="mb-8 text-center text-xl font-bold sm:text-2xl">
            Why Thousands Trust PharmaCare
          </h2>

          {/* Trust Features */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-6">
            {trustFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-8 items-center justify-center">
                  {feature.icon}
                </div>

                <h3 className="text-sm font-bold sm:text-base">
                  {feature.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/90">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;