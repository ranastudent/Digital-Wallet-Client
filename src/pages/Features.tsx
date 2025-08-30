import { Shield, Send, Wallet, Smartphone, Users, LineChart } from "lucide-react";
import { motion } from "framer-motion";

// add your subtle Lottie JSON
import { useState, useEffect } from "react";

function Features() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Secure Transactions",
      description: "Your money and data are protected with enterprise-grade encryption.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
    {
      title: "Instant Transfers",
      description: "Send and receive money instantly with just a few taps.",
      icon: <Send className="h-8 w-8 text-success" />,
    },
    {
      title: "Digital Wallet",
      description: "Manage your balance, transactions, and more in one place.",
      icon: <Wallet className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Mobile Friendly",
      description: "Access your wallet anytime, anywhere with a smooth mobile experience.",
      icon: <Smartphone className="h-8 w-8 text-pink-600" />,
    },
    {
      title: "User Management",
      description: "Admins and agents can manage users and provide fast support.",
      icon: <Users className="h-8 w-8 text-warning" />,
    },
    {
      title: "Analytics",
      description: "Track spending, earnings, and growth with real-time insights.",
      icon: <LineChart className="h-8 w-8 text-indigo-600" />,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-20 px-6 lg:px-20 bg-background">
      {/* Hero Lottie Background */}
      

      {/* Hero Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Our Features
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the powerful features that make our wallet secure, fast, and user-friendly.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-card text-card-foreground shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            variants={cardVariants}
          >
            <div className="flex items-center justify-center w-14 h-14 bg-muted rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
