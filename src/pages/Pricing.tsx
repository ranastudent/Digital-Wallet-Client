import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import pricingAnimation from "@/assets/Gradient BG.json"; // Add your subtle Lottie JSON here

function Pricing() {
  const [loading, setLoading] = useState(true);

  const plans = [
    {
      name: "Basic",
      price: "$0",
      features: ["Limited Transactions", "Basic Support", "1 Wallet Account"],
    },
    {
      name: "Pro",
      price: "$9.99/mo",
      features: ["Unlimited Transactions", "Priority Support", "Multiple Wallets"],
    },
    {
      name: "Enterprise",
      price: "$29.99/mo",
      features: ["Custom Limits", "Dedicated Support", "Advanced Analytics"],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-background px-6 py-16">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Lottie animationData={pricingAnimation} loop={true} className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Pricing Plans
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that suits your needs. Transparent fees and scalable options for everyone.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground rounded-2xl p-6 hover:shadow-lg transition"
            >
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/2 mx-auto" />
                  <Skeleton className="h-10 w-1/3 mx-auto mt-2" />
                  <div className="space-y-2 mt-4">
                    {plan.features.map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full rounded" />
                    ))}
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              ) : (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <p className="text-xl font-semibold mt-2">{plan.price}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mt-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-muted-foreground text-sm">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 text-center">
                      <Button variant="default">Select Plan</Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
