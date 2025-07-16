import { Users, Award, Calendar, MapPin } from "lucide-react";

export default function Statistics() {
  const stats = [
    {
      icon: <Calendar className="h-8 w-8" />,
      number: "15+",
      label: "Years Experience",
      description: "Serving clients with excellence"
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: "362+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide"
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "55+",
      label: "Product Lines",
      description: "Premium stone collections"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      number: "400+",
      label: "Material References",
      description: "Extensive stone varieties"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-stone-bronze to-stone-dark text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-stone-gold/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-stone-cream/90 max-w-2xl mx-auto">
            Our commitment to excellence has earned us the trust of clients worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 text-stone-gold group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-stone-gold">
                {stat.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {stat.label}
              </h3>
              <p className="text-stone-cream/80 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}