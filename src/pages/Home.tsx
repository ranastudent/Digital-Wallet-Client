import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// If you want to use Lottie
import Lottie from "lottie-react";

// Example animation JSONs (replace with your own)
import secureAnimation from "@/assets/Secure Payment.json";
import walletAnimation from "@/assets/Transaction Confirmation.json";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center h-[80vh] md:h-[90vh] px-4 md:px-0 overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        {/* Floating Shapes */}
        <span className="absolute w-32 h-32 bg-white/20 rounded-full animate-pulse-slow top-10 left-10"></span>
        <span className="absolute w-48 h-48 bg-white/10 rounded-full animate-spin-slow bottom-20 right-20"></span>
        <span className="absolute w-24 h-24 bg-white/15 rounded-full animate-ping-slow top-1/2 left-1/4"></span>

        <div className="relative max-w-3xl z-10">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-2/3 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <div className="flex justify-center gap-4 mt-6">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 transition-transform duration-500 hover:scale-105">
                Welcome to DigitalWallet
              </h1>
              <p className="text-lg md:text-xl mb-6 transition-opacity duration-500">
                Seamlessly manage your finances with speed and security.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Link to="/login">
                  <Button className="px-6 py-3 transition-transform duration-300 hover:scale-105">
                    Get Started
                  </Button>
                </Link>
                <Link to="/features">
                  <Button
                    variant="destructive"
                    className="px-6 py-3 transition-transform duration-300 hover:scale-105"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="flex-1 bg-background px-4 py-12 md:py-24">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Fast & Secure</h2>
              <p className="text-lg">
                Your transactions are protected and processed instantly.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {!loading ? (
                <Lottie animationData={secureAnimation} loop={true} className="h-64 w-64" />
              ) : (
                <Skeleton className="h-48 md:h-64 w-full rounded" />
              )}
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Track Your Wallet</h2>
              <p className="text-lg">
                Monitor your balance, transactions, and history anytime.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {!loading ? (
                <Lottie animationData={walletAnimation} loop={true} className="h-64 w-64" />
              ) : (
                <Skeleton className="h-48 md:h-64 w-full rounded" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
