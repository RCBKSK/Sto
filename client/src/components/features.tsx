import { Shield, Truck, Phone, Award, Clock, Hammer } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Guarantee",
      description: "All our natural stone products come with a comprehensive quality guarantee and warranty."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Delivery",
      description: "Complimentary delivery service for orders over $500 within our service area."
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your questions and concerns."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Materials",
      description: "Sourced from the finest quarries worldwide, ensuring exceptional quality and beauty."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Quick Installation",
      description: "Professional installation service with minimal disruption to your daily routine."
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: "Expert Craftsmanship",
      description: "Skilled artisans with decades of experience in natural stone installation."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">
            Why Choose Elegance Stone?
          </h2>
          <p className="text-xl text-stone-gray max-w-3xl mx-auto">
            We're committed to providing exceptional service and premium quality natural stone products that exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl hover:bg-stone-beige/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-stone-bronze/20"
            >
              <div className="w-16 h-16 bg-gradient-stone rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-stone-dark mb-3 group-hover:text-stone-bronze transition-colors">
                {feature.title}
              </h3>
              <p className="text-stone-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}