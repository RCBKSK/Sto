import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function Hero() {
  const { t, language } = useLanguage();
  
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
      {/* Beautiful stone texture background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-stone-800 to-amber-900"></div>
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="stone-texture" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="#2c2c2c"/>
              <circle cx="50" cy="50" r="30" fill="#3c3c3c" opacity="0.3"/>
              <circle cx="150" cy="120" r="25" fill="#4c4c4c" opacity="0.2"/>
              <circle cx="80" cy="160" r="35" fill="#383838" opacity="0.4"/>
              <polygon points="120,20 140,60 100,80 80,40" fill="#444" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stone-texture)"/>
        </svg>
      </div>
      
      {/* Floating stone elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-24 bg-gradient-to-br from-amber-600/20 to-stone-700/20 rounded-3xl transform rotate-12 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-32 bg-gradient-to-br from-stone-600/20 to-amber-700/20 rounded-3xl transform -rotate-12 animate-float-delay"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-20 bg-gradient-to-br from-stone-500/20 to-amber-800/20 rounded-3xl transform rotate-6 animate-float"></div>
      </div>
      
      <div className={`relative z-20 text-center text-white max-w-5xl mx-auto px-4 ${language === 'fa' ? 'font-vazir' : ''}`}>
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-stone-bronze/20 backdrop-blur-sm rounded-full text-stone-cream text-sm font-medium border border-stone-cream/30">
            {t("hero.badge")}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight break-words">
          {t("hero.title1")} <span className="text-stone-gold bg-gradient-to-r from-stone-gold to-stone-cream bg-clip-text text-transparent">{t("hero.title2")}</span>
          <br />
          {t("hero.title3")}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
          {t("hero.description")}
        </p>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-sm text-stone-cream/80">
          <div className="flex items-center">
            <span className={`w-2 h-2 bg-stone-gold rounded-full ${language === 'fa' ? 'ml-2' : 'mr-2'}`}></span>
            {t("hero.experience")}
          </div>
          <div className="flex items-center">
            <span className={`w-2 h-2 bg-stone-gold rounded-full ${language === 'fa' ? 'ml-2' : 'mr-2'}`}></span>
            {t("hero.clients")}
          </div>
          <div className="flex items-center">
            <span className={`w-2 h-2 bg-stone-gold rounded-full ${language === 'fa' ? 'ml-2' : 'mr-2'}`}></span>
            {t("hero.quality")}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-stone hover:shadow-stone-lg text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/products">
              <ArrowRight className={`h-5 w-5 ${language === 'fa' ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {t("hero.exploreProducts")}
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 hover:text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/contact">
              <Phone className={`h-5 w-5 ${language === 'fa' ? 'ml-2' : 'mr-2'}`} />
              {t("hero.getFreeQuote")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
