import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-dark/80 to-stone-gray/60 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>
      
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Elegance with <span className="text-stone-cream">Timeless</span><br />
          Natural Stone Cladding
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Cladding Natural Stone is an innovative natural stone supplier known for its exceptional quality 
          and distinctive designs featured in our extensive portfolio of over 55 products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-stone-bronze hover:bg-orange-600 text-white px-8 py-4 text-lg"
          >
            <Link href="/products">
              <ArrowRight className="mr-2 h-5 w-5" />
              Explore Products
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-2 border-white text-white hover:bg-white hover:text-stone-dark px-8 py-4 text-lg"
          >
            <Link href="/contact">
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
