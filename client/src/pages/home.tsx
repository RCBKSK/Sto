import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import ServicesProcess from "@/components/services-process";
import Collections from "@/components/collections";
import PopularProducts from "@/components/popular-products";
import Statistics from "@/components/statistics";
import Team from "@/components/team";
import Footer from "@/components/footer";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Newsletter from "@/components/newsletter";
import EnhancedCTA from "@/components/enhanced-cta";
import BackToTop from "@/components/back-to-top";
import LiveChat from "@/components/live-chat";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Phone, Users, Leaf, Calculator, Scan, MessageCircle, Calendar } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Home() {
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ServicesProcess />
      <Collections />
      <PopularProducts />
      <Features />
      
      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-6">
                Creating Beautiful Bathrooms That Inspire
              </h2>
              <p className="text-lg text-stone-gray mb-6 leading-relaxed">
                With years of experience and a passion for design, we specialize in creating stunning bathrooms 
                that combine functionality and style. From concept to delivery, our team of experts will work 
                closely with you to bring your vision to life.
              </p>
              <p className="text-lg text-stone-gray mb-8 leading-relaxed">
                We understand that the bathroom is an essential part of the home, and it should be designed 
                to reflect your individual style and create a space for relaxation and rejuvenation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-stone-bronze hover:bg-orange-600 text-white">
                  <Link href="/products">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Explore Products
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-stone-dark text-stone-dark hover:bg-stone-dark hover:text-white">
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Beautiful bathroom with natural stone"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <Statistics />

      {/* Advanced Tools Section */}
      <section className="py-20 bg-gradient-to-br from-stone-beige via-white to-stone-beige relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#D4A574_1px,_transparent_1px)] bg-[length:50px_50px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4 bg-gradient-to-r from-stone-dark via-stone-bronze to-stone-gold bg-clip-text text-transparent">
              Advanced Digital Tools
            </h2>
            <p className="text-xl text-stone-gray max-w-3xl mx-auto">
              Experience the future of stone selection with our cutting-edge technology and personalized service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* AR Preview Tool */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200/50 hover:border-blue-300/50 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Scan className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-dark mb-4 group-hover:text-blue-600 transition-colors">AR Preview</h3>
                <p className="text-stone-gray mb-6 leading-relaxed">Visualize stones in your space using cutting-edge augmented reality technology. See exactly how your chosen stone will look before installation.</p>
                <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/products">Experience AR View</Link>
                </Button>
              </div>
            </div>

            {/* Price Calculator Tool */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200/50 hover:border-green-300/50 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Calculator className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-dark mb-4 group-hover:text-green-600 transition-colors">Smart Calculator</h3>
                <p className="text-stone-gray mb-6 leading-relaxed">Get instant, accurate pricing estimates for your stone projects. Configure dimensions, finishes, and installation options for precise quotes.</p>
                <Button asChild className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/products">Calculate Price</Link>
                </Button>
              </div>
            </div>

            {/* Live Chat Tool */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200/50 hover:border-purple-300/50 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-dark mb-4 group-hover:text-purple-600 transition-colors">Expert Chat</h3>
                <p className="text-stone-gray mb-6 leading-relaxed">Connect instantly with our stone specialists. Get expert advice, design recommendations, and technical support in real-time.</p>
                <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/contact">Start Chat</Link>
                </Button>
              </div>
            </div>

            {/* Consultation Booking Tool */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200/50 hover:border-orange-300/50 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-dark mb-4 group-hover:text-orange-600 transition-colors">Personal Consultation</h3>
                <p className="text-stone-gray mb-6 leading-relaxed">Schedule a one-on-one meeting with our design experts. Get personalized recommendations and professional guidance for your project.</p>
                <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/contact">Book Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-stone-bronze rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-dark mb-4">We Have Expert and Personable Team</h3>
              <p className="text-stone-gray">Achieving excellence through results-driven solutions and personalized service</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-stone-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-dark mb-4">Sustainable Solutions</h3>
              <p className="text-stone-gray">Elevate your space with eco-friendly and sustainable natural stone solutions.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-stone-bronze rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-dark mb-4">Get a Custom Quote</h3>
              <p className="text-stone-gray">Unlock your dream space with a personalized quote tailored just for you.</p>
              <Button asChild className="mt-4 bg-stone-bronze hover:bg-orange-600 text-white">
                <Link href="/products">Try Price Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">Our Gallery</h2>
            <p className="text-xl text-stone-gray">Showcasing our finest natural stone installations and designs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
              "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
              "https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
              "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
              "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
              "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
            ].map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl h-80">
                  <img 
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-dark/0 group-hover:bg-stone-dark/20 transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Team />
      <Testimonials />

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">Latest News & Insights</h2>
            <p className="text-xl text-stone-gray">Stay updated with the latest trends and tips in natural stone design</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-stone-gray mb-3">
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    <span className="mx-2">•</span>
                    <span className="text-stone-bronze">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-stone-dark mb-3 group-hover:text-stone-bronze transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-stone-gray text-sm">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <EnhancedCTA />
      <Newsletter />
      <Footer />
      <BackToTop />
      
      {/* Floating Live Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="w-80 h-96 bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden hidden" id="chat-widget">
          <LiveChat />
        </div>
        <button 
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          onClick={() => {
            const widget = document.getElementById('chat-widget');
            if (widget) {
              widget.classList.toggle('hidden');
            }
          }}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
