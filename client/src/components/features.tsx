import { Shield, Truck, Phone, Award, Clock, Hammer } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function Features() {
  const { t, language } = useLanguage();
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: t("features.qualityGuarantee"),
      description: t("features.qualityDesc")
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: t("features.freeDelivery"),
      description: t("features.deliveryDesc")
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: t("features.support"),
      description: t("features.supportDesc")
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: t("features.premium"),
      description: t("features.premiumDesc")
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t("features.installation"),
      description: t("features.installationDesc")
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: t("features.craftsmanship"),
      description: t("features.craftsmanshipDesc")
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-stone-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 stone-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-stone-gold/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-stone-bronze/10 rounded-full animate-float-delay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-stone-bronze/10 rounded-full mb-4">
            <span className="text-stone-bronze font-semibold text-sm uppercase tracking-wide">
              {language === 'fa' ? 'مزایای ما' : 'Why Choose Us'}
            </span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold text-stone-dark mb-6 ${language === 'fa' ? 'font-vazir' : ''}`}>
            {t("features.title")}
          </h2>
          <p className={`text-xl text-stone-gray max-w-3xl mx-auto ${language === 'fa' ? 'font-vazir' : ''}`}>
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-stone-lg transition-all duration-500 cursor-pointer border border-stone-200/50 hover:border-stone-bronze/30 transform hover:-translate-y-2"
            >
              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-stone-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon with animated background */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-stone rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-stone-gold/20 rounded-2xl animate-pulse"></div>
              </div>
              
              <h3 className={`text-xl font-bold text-stone-dark mb-4 group-hover:text-stone-bronze transition-colors ${language === 'fa' ? 'font-vazir' : ''}`}>
                {feature.title}
              </h3>
              <p className={`text-stone-gray leading-relaxed ${language === 'fa' ? 'font-vazir text-right' : ''}`}>
                {feature.description}
              </p>
              
              {/* Hover accent line */}
              <div className="w-12 h-1 bg-stone-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-4"></div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-stone-bronze mb-2 group-hover:scale-110 transition-transform">
                15+
              </div>
              <p className={`text-stone-gray ${language === 'fa' ? 'font-vazir' : ''}`}>
                {t("hero.experience")}
              </p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-stone-bronze mb-2 group-hover:scale-110 transition-transform">
                362+
              </div>
              <p className={`text-stone-gray ${language === 'fa' ? 'font-vazir' : ''}`}>
                {t("hero.clients")}
              </p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-stone-bronze mb-2 group-hover:scale-110 transition-transform">
                100%
              </div>
              <p className={`text-stone-gray ${language === 'fa' ? 'font-vazir' : ''}`}>
                {t("hero.quality")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}