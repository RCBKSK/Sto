import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-stone-dark via-stone-gray to-stone-dark text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Let our expert team help you choose the perfect natural stone solution for your project. 
          Get started with a free consultation today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-stone hover:shadow-stone-lg text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/contact">
              <ArrowRight className="mr-2 h-5 w-5" />
              Get Free Consultation
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 hover:text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/products">
              <Phone className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-stone-gold rounded-full"></span>
            <span>Free Design Consultation</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-stone-gold rounded-full"></span>
            <span>Expert Installation Service</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-stone-gold rounded-full"></span>
            <span>Lifetime Quality Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}