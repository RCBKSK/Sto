import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-4 h-4 bg-stone-gold rounded-full animate-float opacity-30"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-stone-cream rounded-full animate-float-delay opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-stone-bronze rounded-full animate-float opacity-35"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-stone-gold rounded-full animate-float-delay opacity-25"></div>
      </div>
      
      {/* Enhanced background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-dark/90 via-stone-gray/70 to-stone-bronze/60 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-20000 hover:scale-110"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>
      
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-stone-bronze/20 backdrop-blur-sm rounded-full text-stone-cream text-sm font-medium border border-stone-cream/30">
            Premium Natural Stone Since 2010
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Elegance with <span className="text-stone-gold bg-gradient-to-r from-stone-gold to-stone-cream bg-clip-text text-transparent">Timeless</span><br />
          Natural Stone Cladding
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Cladding Natural Stone is an innovative natural stone supplier known for its exceptional quality 
          and distinctive designs featured in our extensive portfolio of over 55 products with 400+ material references.
        </p>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-stone-cream/80">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-stone-gold rounded-full mr-2"></span>
            15+ Years Experience
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-stone-gold rounded-full mr-2"></span>
            362+ Happy Clients
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-stone-gold rounded-full mr-2"></span>
            Premium Quality Guaranteed
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-stone hover:shadow-stone-lg text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
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
            className="border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 hover:text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/contact">
              <Phone className="mr-2 h-5 w-5" />
              Get Free Quote
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
