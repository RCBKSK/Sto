import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Phone, Star } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function EnhancedCTA() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-stone-dark via-gray-900 to-stone-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 stone-pattern opacity-10"></div>
      <div className="absolute top-10 left-10 w-40 h-40 bg-stone-gold/10 rounded-full animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-stone-bronze/10 rounded-full animate-float-delay"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-stone-gold rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-stone-bronze rounded-full animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          {/* Floating badge */}
          <div className="inline-block px-4 py-2 bg-stone-bronze/20 backdrop-blur-sm rounded-full mb-6 border border-stone-bronze/30">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-stone-gold" />
              <span className="text-stone-cream font-semibold text-sm">
                {language === 'fa' ? 'پروژه رویایی خود را شروع کنید' : 'Start Your Dream Project'}
              </span>
              <Star className="h-4 w-4 text-stone-gold" />
            </div>
          </div>
          
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${language === 'fa' ? 'font-vazir' : ''}`}>
            <span className="text-white">
              {language === 'fa' ? 'آماده تبدیل' : 'Ready to Transform'}
            </span>
            <br />
            <span className="text-stone-gold bg-gradient-to-r from-stone-gold to-amber-400 bg-clip-text text-transparent">
              {language === 'fa' ? 'فضای خود؟' : 'Your Space?'}
            </span>
          </h2>
          
          <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed ${language === 'fa' ? 'font-vazir' : ''}`}>
            {language === 'fa' 
              ? 'به صدها مشتری راضی بپیوندید که به ما اعتماد کرده‌اند تا چشم‌انداز سنگ طبیعی آنها را به واقعیت تبدیل کنیم.'
              : 'Join hundreds of satisfied customers who have trusted us to bring their natural stone vision to life with unparalleled craftsmanship and quality.'
            }
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 text-sm text-stone-cream/80">
            <div className="flex items-center">
              <span className={`w-2 h-2 bg-stone-gold rounded-full ${language === 'fa' ? 'ml-2' : 'mr-2'}`}></span>
              {language === 'fa' ? 'مشاوره رایگان' : 'Free Consultation'}
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 bg-stone-gold rounded-full ${language === 'fa' ? 'ml-2' : 'mr-2'}`}></span>
              {language === 'fa' ? 'تضمین کیفیت' : 'Quality Guarantee'}
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 bg-stone-gold rounded-full ${language === 'fa' ? 'ml-2' : 'mr-2'}`}></span>
              {language === 'fa' ? 'نصب حرفه‌ای' : 'Professional Installation'}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-stone hover:shadow-stone-lg text-white px-10 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-xl"
            >
              <Link href="/contact">
                <ArrowRight className={`h-6 w-6 ${language === 'fa' ? 'ml-3 rotate-180' : 'mr-3'}`} />
                {language === 'fa' ? 'همین امروز شروع کنید' : 'Get Started Today'}
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 hover:text-white px-10 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-xl"
            >
              <Link href="/gallery">
                <Phone className={`h-6 w-6 ${language === 'fa' ? 'ml-3' : 'mr-3'}`} />
                {language === 'fa' ? 'مشاهده کارهای ما' : 'View Our Work'}
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Bottom accent */}
        <div className="text-center pt-8 border-t border-stone-bronze/30">
          <p className={`text-stone-cream/60 ${language === 'fa' ? 'font-vazir' : ''}`}>
            {language === 'fa' 
              ? '⭐ بیش از ۳۶۲ پروژه موفق در سراسر منطقه ⭐'
              : '⭐ Over 362 successful projects across the region ⭐'
            }
          </p>
        </div>
      </div>
    </section>
  );
}