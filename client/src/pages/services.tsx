import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ServicesProcess from "@/components/services-process";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Hammer, Palette, Shield, Users, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { EditableContent } from "@/components/cms/editable-content";

export default function Services() {
  const { t, language } = useLanguage();
  
  const services = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Design Consultation",
      description: "Work with our expert designers to create a customized plan that perfectly matches your vision, style, and budget requirements.",
      features: [
        "Personalized design consultation",
        "3D visualization and planning",
        "Material recommendations",
        "Budget planning and optimization"
      ]
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: "Professional Installation",
      description: "Our skilled craftsmen ensure precise installation with meticulous attention to detail and industry-leading techniques.",
      features: [
        "Expert installation team",
        "Quality craftsmanship guaranteed",
        "Proper surface preparation",
        "Post-installation cleanup"
      ]
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Maintenance & Support",
      description: "Comprehensive maintenance services to keep your natural stone surfaces looking beautiful for years to come.",
      features: [
        "Regular maintenance programs",
        "Repair and restoration services",
        "Sealing and protection treatments",
        "24/7 customer support"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Team",
      description: "Our experienced professionals bring years of expertise to every project."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive warranties and quality assurance."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Timely Delivery",
      description: "We complete projects on schedule without compromising on quality."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-dark mb-6">
              Our Services
            </h1>
            <p className="text-xl text-stone-gray max-w-2xl mx-auto">
              From initial consultation to final installation, we provide comprehensive services 
              to bring your natural stone vision to life.
            </p>
          </div>
        </div>
      </section>

      <ServicesProcess />

      {/* Detailed Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-stone-gray">
              Comprehensive services tailored to your natural stone needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-stone-bronze rounded-lg flex items-center justify-center text-white mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl text-stone-dark">{service.title}</CardTitle>
                  <CardDescription className="text-stone-gray">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-stone-gray">
                        <CheckCircle className="h-4 w-4 text-stone-green mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-stone-gray">
              The advantages of working with our professional team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-stone-bronze rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-stone-dark mb-2">{benefit.title}</h3>
                <p className="text-stone-gray">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today for a consultation and let's discuss how we can bring your natural stone vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-stone-bronze hover:bg-orange-600 text-white">
              <Link href="/contact">
                <ArrowRight className="mr-2 h-5 w-5" />
                Get Free Quote
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-stone-dark">
              <Link href="/products">
                View Our Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
