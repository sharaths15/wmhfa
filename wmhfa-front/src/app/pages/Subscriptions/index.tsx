import { Check } from "lucide-react";

const PlanCard = ({
  plan,
  price,
  description,
  features,
  popular = false,
}: any) => (
  <div
    className={`border-2 rounded-xl p-8 flex flex-col ${
      popular ? "border-primary shadow-2xl" : "border-border"
    }`}
  >
    {popular && (
      <span className="text-xs font-bold bg-primary text-white py-1 px-3 rounded-full self-start mb-4">
        MOST POPULAR
      </span>
    )}
    <h3 className="text-2xl font-extrabold">{plan}</h3>
    <p className="text-text-light my-4">{description}</p>
    <p className="text-5xl font-extrabold my-4">
      ${price}
      <span className="text-base font-medium text-text-light">/mo</span>
    </p>

    <button
      className={`w-full font-bold py-3 rounded-lg mt-4 mb-8 transition-colors ${
        popular
          ? "bg-primary text-white hover:bg-primary/90"
          : "bg-subtle text-primary hover:bg-border"
      }`}
    >
      {popular ? "Upgrade Now" : "Get Started"}
    </button>

    <div className="space-y-3 text-text-light">
      {features.map((feature: string) => (
        <div key={feature} className="flex items-center space-x-3">
          <Check className="text-secondary" size={20} />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

export const SubscriptionsPage = () => (
  <div>
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-4">
        Find the Plan That's Right for You
      </h2>
      <p className="text-text-light text-lg">
        Unlock exclusive resources, expert coaching, and advanced tools to
        enhance your impact as a Mental Health First Aider.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      <PlanCard
        plan="Community"
        price="0"
        description="Basic access to our community platform and resources."
        features={[
          "Community feed access",
          "Resource directory (limited)",
          "Peer support groups",
        ]}
      />
      <PlanCard
        plan="MHFAider Pro"
        price="15"
        popular={true}
        description="For active first aiders seeking advanced support and tools."
        features={[
          "Everything in Community",
          "Unlimited resource access",
          "AI conversation support",
          "Monthly expert Q&A webinars",
          "Priority support",
        ]}
      />
      <PlanCard
        plan="Organization"
        price="Contact Us"
        description="Custom solutions for workplaces and teams."
        features={[
          "Everything in Pro",
          "Team dashboards & analytics",
          "In-house training discounts",
          "Dedicated account manager",
          "Platform integration options",
        ]}
      />
    </div>
  </div>
);
