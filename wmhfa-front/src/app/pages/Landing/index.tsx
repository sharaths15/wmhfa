import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiUsers,
  FiCpu,
  FiBookOpen,
  FiBriefcase,
  FiMenu,
  FiCheckCircle,
} from "react-icons/fi";

const StaggeredContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AnimatedSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={StaggeredContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <HeroSection />
        <TrustedBy />
        <WhyMHFAider />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Features", "Community", "Pricing", "About"];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">MHFAider</div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/login"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Log In
          </a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-secondary text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Join Now
          </motion.a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiMenu className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Log In
              </a>
              <a
                href="#"
                className="bg-secondary text-white px-6 py-2 rounded-full font-semibold"
              >
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-white animate-gradient bg-[200%_200%]" />
      <div className="container mx-auto px-6 py-24 md:py-32 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold text-primary leading-tight mb-4"
        >
          Supporting You,
          <br />
          So You Can Support Others.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        >
          The essential community for Mental Health First Aiders. Access peer
          support, expert resources, and AI-powered tools to make a real
          difference.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center items-center gap-4"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-secondary text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-500 transition-all"
          >
            Join The Community
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Explore Features
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

const TrustedBy = () => (
  <div className="bg-light-bg py-12">
    <div className="container mx-auto px-6 text-center">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
        Trusted by leading organisations and MHFAiders worldwide
      </p>
      <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap opacity-60">
        {/* Replace with actual client logos */}
        <span className="font-bold text-xl text-gray-500">OrgLogo</span>
        <span className="font-bold text-xl text-gray-500">HealthCorp</span>
        <span className="font-bold text-xl text-gray-500">GovDept</span>
        <span className="font-bold text-xl text-gray-500">Innovate Inc.</span>
        <span className="font-bold text-xl text-gray-500">Community First</span>
      </div>
    </div>
  </div>
);

const WhyMHFAider = () => {
  const supportPillars = [
    {
      title: "End Post-Training Isolation",
      description:
        "Your training was just the beginning. Connect with a vibrant network of peers for ongoing support, shared experiences, and well-being check-ins.",
      icon: <FiUsers />,
    },
    {
      title: "Find Resources, Instantly",
      description:
        "Stop searching endlessly. Access a curated library of vetted articles, toolkits, and guides to support others and yourself effectively.",
      icon: <FiBookOpen />,
    },
    {
      title: "Navigate Difficult Conversations",
      description:
        "Gain confidence with our AI-powered conversation simulator. Practice and get guidance on how to approach sensitive topics with care and skill.",
      icon: <FiCpu />,
    },
  ];
  return (
    <AnimatedSection className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-4"
        >
          Your Support System Starts Here
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          We exist to empower the helpers. Here’s how we support you beyond
          accreditation.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {supportPillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-light-bg p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="text-secondary text-4xl mb-4">{pillar.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {pillar.title}
              </h3>
              <p className="text-gray-600">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const features = [
    {
      name: "Community",
      icon: <FiUsers />,
      title: "A Thriving Peer Network",
      content:
        "Connect in forums, join special interest groups, and attend virtual check-ins. You are not alone. Share wisdom, ask questions, and grow together in a safe, moderated space.",
      image: "https://placehold.co/500x350/E0F2F1/10B981?text=Community+Mockup",
    },
    {
      name: "AI Coach",
      icon: <FiCpu />,
      title: "AI for Conversation Support",
      content:
        "Our groundbreaking AI Coach, 'Aura', helps you prepare for difficult conversations. Simulate scenarios, get instant feedback, and access prompts to ensure you're providing the best possible support.",
      image:
        "https://placehold.co/500x350/E0F2F7/0EA5E9?text=AI+Chat+Interface",
    },
    {
      name: "Integrations",
      icon: <FiBriefcase />,
      title: "Growth & Integration",
      content:
        "Seamlessly integrate with the tools you already use. We're building connections for MS 365, Slack, and major HR/Payroll platforms to bring mental health support into your daily workflow.",
      image:
        "https://placehold.co/500x350/F3E8FF/A855F7?text=MS+365+%2B+Slack+Logos",
    },
  ];
  return (
    <AnimatedSection className="py-20 md:py-28 bg-light-bg">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
        >
          Everything You Need, All In One Place
        </motion.h2>
        <div className="flex justify-center mb-8 space-x-2 md:space-x-4">
          {features.map((feature, index) => (
            <button
              key={feature.name}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === index
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="hidden md:inline">{feature.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              <div className="text-left">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {features[activeTab].title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {features[activeTab].content}
                </p>
              </div>
              <div>
                <img
                  src={features[activeTab].image}
                  alt={features[activeTab].title}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AnimatedSection>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "MHFAider has been a game-changer. The peer network is invaluable for debriefing after a tough conversation. I feel so much more supported in my role.",
      name: "Sarah J.",
      role: "HR Manager, Tech Corp",
    },
    {
      quote:
        "The AI Coach is revolutionary. It's like having a supervisor on-demand to help you prepare. My confidence in handling sensitive situations has skyrocketed.",
      name: "David L.",
      role: "Team Lead, Manufacturing",
    },
    {
      quote:
        "Finally, a community that 'gets it'. Beyond the training, this is where the real learning and support happens. I recommend it to every MHFAider I know.",
      name: "Maria R.",
      role: "Community Champion, NFP",
    },
  ];
  return (
    <AnimatedSection className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
        >
          Hear From Our Community
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-light-bg p-8 rounded-xl shadow-sm flex flex-col"
            >
              <p className="text-gray-600 italic mb-6 flex-grow">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-bold text-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const plans = [
    {
      name: "Community",
      price: { monthly: 0, annual: 0 },
      description: "Get started and connect with peers.",
      features: [
        "Basic Forum Access",
        "Weekly Newsletter",
        "Limited Resource Library",
      ],
      cta: "Join for Free",
    },
    {
      name: "Pro",
      price: { monthly: 15, annual: 144 },
      popular: true,
      description: "For the dedicated MHFAider.",
      features: [
        "Full Community Access",
        "Complete Resource Library",
        "AI Conversation Coach",
        "Exclusive Webinars",
        "Gamified Badges",
      ],
      cta: "Start Pro Trial",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations supporting their teams.",
      features: [
        "All Pro features",
        "Admin Dashboard & Analytics",
        "Team Management",
        "MS 365 & HR Integrations",
        "Dedicated Support",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <AnimatedSection className="py-20 md:py-28 bg-light-bg">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-4"
        >
          Find the Plan That's Right for You
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center items-center my-8 gap-4"
        >
          <span className="font-medium text-gray-600">Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
          </label>
          <span className="font-medium text-gray-600">Annual</span>
          <span className="bg-green-100 text-green-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded-full">
            Save 20%
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-12 items-stretch">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`rounded-xl border p-8 flex flex-col ${
                plan.popular
                  ? "border-secondary shadow-2xl relative"
                  : "border-gray-200 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-primary text-center">
                {plan.name}
              </h3>
              <div className="text-center my-6">
                {typeof plan.price === "string" ? (
                  <span className="text-4xl font-extrabold text-primary">
                    {plan.price}
                  </span>
                ) : (
                  <>
                    <span className="text-4xl font-extrabold text-primary">
                      ${isAnnual ? plan.price.annual / 12 : plan.price.monthly}
                    </span>
                    <span className="text-gray-500">/ month</span>
                    {isAnnual && plan.price.annual > 0 && (
                      <p className="text-sm text-gray-500">
                        Billed as ${plan.price.annual} per year
                      </p>
                    )}
                  </>
                )}
              </div>
              <p className="text-center text-gray-600 mb-6 h-12">
                {plan.description}
              </p>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <FiCheckCircle className="text-secondary w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full text-center block rounded-full py-3 font-bold mt-auto ${
                  plan.popular
                    ? "bg-secondary text-white"
                    : "bg-accent text-white"
                }`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const FinalCTA = () => (
  <div className="py-20 md:py-28 text-center">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">
        Ready to Make a Greater Impact?
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Join a community dedicated to fostering mental wellness in our
        workplaces and communities. Your journey of support continues here.
      </p>
      <motion.a
        href="#pricing"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="bg-secondary text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:bg-green-500 transition-all inline-block"
      >
        Become a Member Today
      </motion.a>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-primary text-white" id="about">
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">MHFAider</h3>
          <p className="text-blue-200">
            Elevating Mental Health First Aid to be as valued as Physical First
            Aid.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Membership
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-blue-700 pt-8 text-center text-blue-300">
        <p>© {new Date().getFullYear()} MHFAider. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);
