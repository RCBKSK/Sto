import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-stone-dark via-stone-gray to-stone-dark text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-stone-bronze/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-stone-gold/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-stone rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest natural stone trends, design inspiration, 
            exclusive offers, and expert tips delivered to your inbox monthly.
          </p>
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20"
                required
              />
              <Button 
                type="submit"
                className="bg-gradient-stone hover:shadow-stone-lg text-white whitespace-nowrap"
              >
                Subscribe Now
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </form>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-stone-gold">
            <CheckCircle className="h-6 w-6" />
            <span className="text-lg font-medium">Thank you for subscribing!</span>
          </div>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <h4 className="font-semibold mb-2">Design Inspiration</h4>
            <p className="text-sm text-gray-300">Latest trends and project showcases</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-2">Exclusive Offers</h4>
            <p className="text-sm text-gray-300">Special discounts for subscribers</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-2">Expert Tips</h4>
            <p className="text-sm text-gray-300">Professional maintenance advice</p>
          </div>
        </div>
      </div>
    </section>
  );
}