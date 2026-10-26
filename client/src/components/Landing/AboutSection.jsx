const AboutSection = () => {
  const features = [
    {
      icon: "💊",
      title: "Wide Range of Medicines",
      description:
        "Explore a wide selection of medicines and healthcare products in one place.",
    },
    {
      icon: "🏥",
      title: "Pharmacy Network",
      description:
        "Discover hospital pharmacies and local pharmacies through one convenient platform.",
    },
    {
      icon: "📋",
      title: "Prescription Support",
      description:
        "Upload your prescription and conveniently manage prescription-based orders.",
    },
    {
      icon: "📦",
      title: "Easy Order Tracking",
      description:
        "Keep track of your orders and check their status from your account.",
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-[#DFF6EE] px-4 py-2 text-sm font-semibold text-[#0F9D74]">
            About PharmaCare
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Your Health, Our{" "}
            <span className="text-[#0F9D74]">Priority</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            PharmaCare brings customers and pharmacies together through a
            convenient online platform for discovering medicines, exploring
            pharmacies, and managing healthcare orders.
          </p>
        </div>

        {/* About Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Making Healthcare More Convenient
            </h3>

            <p className="mt-5 leading-7 text-gray-600">
              Finding medicines and connecting with pharmacies should be
              simple. PharmaCare helps customers explore available products,
              find pharmacies, upload prescriptions, and manage orders from
              one platform.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Our platform also provides pharmacy partners with tools to
              manage medicines and orders, while administrators oversee
              pharmacy verification and platform operations.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-[#F7F9FA] p-5">
                <div className="text-2xl">💚</div>
                <h4 className="mt-3 font-semibold text-gray-900">
                  Customer Focused
                </h4>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Convenient access to pharmacy services.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#F7F9FA] p-5">
                <div className="text-2xl">🔐</div>
                <h4 className="mt-3 font-semibold text-gray-900">
                  Secure Platform
                </h4>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Account-based access and order management.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content: Feature Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DFF6EE] text-2xl">
                  {feature.icon}
                </div>

                <h4 className="mt-5 font-bold text-gray-900">
                  {feature.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-gray-600">
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

export default AboutSection;