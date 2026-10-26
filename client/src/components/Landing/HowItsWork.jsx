const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: "🔍",
      title: "Search Medicines",
      description:
        "Search for the medicines you need and explore available products.",
    },
    {
      number: "02",
      icon: "🏥",
      title: "Choose a Pharmacy",
      description:
        "Explore available pharmacies and select a suitable option.",
    },
    {
      number: "03",
      icon: "🛒",
      title: "Place Your Order",
      description:
        "Add products to your cart, upload a prescription when required, and proceed to checkout.",
    },
    {
      number: "04",
      icon: "📦",
      title: "Track Your Order",
      description:
        "View your order status and follow its progress from your account.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#F7F9FA] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-8xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#DFF6EE] px-4 py-2 text-sm font-semibold text-[#0F9D74]">
            Simple & Convenient
          </span>

          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            How It <span className="text-[#0F9D74]">Works</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Getting the medicines you need is simple. Follow these four steps
            to get started with PharmaCare.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Step Card */}
              <div className="group h-full rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg">
                {/* Number */}
                <div className="absolute right-5 top-5 text-sm font-bold text-gray-300">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DFF6EE] text-3xl transition group-hover:bg-[#0F9D74]">
                  <span className="transition group-hover:scale-110">
                    {step.icon}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>

                {/* Step Indicator */}
                <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-[#0F9D74]" />
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-2xl font-bold text-[#0F9D74] lg:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="/medicines"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0F9D74] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#0b805e]"
          >
            Start Exploring Medicines
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;