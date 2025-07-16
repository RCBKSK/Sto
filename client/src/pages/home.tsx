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
      
      {/* Divider with elegant pattern */}
      <div className="relative py-8 bg-gradient-to-r from-stone-cream via-white to-stone-cream">
        <div className="absolute inset-0 bg-stone-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-stone-bronze to-transparent"></div>
        </div>
      </div>
      
      <ServicesProcess />
      
      {/* Section Separator */}
      <div className="py-12 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4">
              <div className="w-16 h-px bg-stone-bronze"></div>
              <div className="w-3 h-3 bg-stone-bronze rounded-full"></div>
              <div className="w-16 h-px bg-stone-bronze"></div>
            </div>
          </div>
        </div>
      </div>
      
      <Collections />
      
      {/* Enhanced Divider */}
      <div className="relative py-16 bg-stone-50">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-cream/50 via-transparent to-stone-cream/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-stone-bronze"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-stone-bronze rounded-full"></div>
              <div className="w-3 h-3 bg-stone-bronze rounded-full"></div>
              <div className="w-2 h-2 bg-stone-bronze rounded-full"></div>
            </div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-stone-bronze"></div>
          </div>
          <h2 className="mt-6 text-2xl font-playfair font-bold text-stone-dark">Featured Products</h2>
        </div>
      </div>
      
      <PopularProducts />
      
      {/* Modern Section Break */}
      <div className="relative py-20 bg-gradient-to-b from-stone-50 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-stone-bronze/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stone-green/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-stone-dark mb-6">Why Choose Elegance Stone</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-stone-bronze to-stone-green mx-auto"></div>
        </div>
      </div>
      
      <Features />
      
      {/* Expertise Section with enhanced visual design */}
      <section className="relative py-24 bg-gradient-to-br from-white via-stone-cream/30 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-stone-bronze/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-stone-green/8 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with decorative line */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-16 h-px bg-stone-bronze"></div>
              <span className="text-stone-bronze font-semibold tracking-wider uppercase text-sm">Our Expertise</span>
              <div className="w-16 h-px bg-stone-bronze"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-stone-bronze/10 rounded-full blur-xl"></div>
              <h2 className="relative text-4xl md:text-5xl font-playfair font-bold text-stone-dark mb-8 leading-tight">
                Creating Beautiful Spaces That Inspire
              </h2>
              <p className="text-lg text-stone-gray mb-8 leading-relaxed">
                With years of experience and a passion for design, we specialize in creating stunning natural stone installations 
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

      {/* Enhanced Gallery Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-stone-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-stone-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-stone-gold/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            {/* Decorative header */}
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-stone-bronze"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-stone-bronze rounded-full"></div>
                <div className="w-3 h-3 bg-stone-bronze rounded-full"></div>
                <div className="w-2 h-2 bg-stone-bronze rounded-full"></div>
              </div>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-stone-bronze"></div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-stone-dark mb-6">Project Gallery</h2>
            <p className="text-xl text-stone-gray max-w-2xl mx-auto">Showcasing our finest natural stone installations and designs</p>
            
            {/* Decorative accent line */}
            <div className="mt-8 w-32 h-1 bg-gradient-to-r from-stone-bronze to-stone-green mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800", title: "Luxury Bathroom Design", type: "Marble Installation" },
              { image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800", title: "Modern Kitchen Counter", type: "Granite Surface" },
              { image: "https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800", title: "Elegant Foyer", type: "Limestone Flooring" },
              { image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800", title: "Spa Bathroom", type: "Travertine Tiles" },
              { image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800", title: "Contemporary Living", type: "Quartzite Feature Wall" },
              { image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800", title: "Outdoor Terrace", type: "Natural Stone Cladding" }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl h-80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Decorative border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-bronze/20 to-stone-green/20 rounded-2xl p-1">
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/60 via-transparent to-transparent"></div>
                      
                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-stone-bronze text-sm font-semibold tracking-wider uppercase">{item.type}</span>
                        <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-stone-bronze/0 group-hover:bg-stone-bronze/10 transition-colors duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with enhanced spacing */}
      <div className="relative py-16 bg-gradient-to-r from-stone-cream/30 via-white to-stone-cream/30">
        <div className="absolute inset-0 bg-stone-pattern opacity-5"></div>
        <div className="relative">
          <Team />
        </div>
      </div>
      
      {/* Visual Break */}
      <div className="py-12 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-6">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-stone-bronze"></div>
            <div className="text-stone-bronze text-sm font-semibold tracking-wider uppercase">Client Stories</div>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-stone-bronze"></div>
          </div>
        </div>
      </div>
      
      <Testimonials />

      {/* Enhanced Blog Section */}
      <section className="relative py-24 bg-gradient-to-br from-stone-50 via-white to-stone-cream/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-stone-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-stone-gold/8 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            {/* Decorative header */}
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-stone-bronze"></div>
              <span className="text-stone-bronze font-semibold tracking-wider uppercase text-sm">Insights & Inspiration</span>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-stone-bronze"></div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-stone-dark mb-6">Latest News & Insights</h2>
            <p className="text-xl text-stone-gray max-w-2xl mx-auto">Stay updated with the latest trends and tips in natural stone design</p>
            
            {/* Decorative accent */}
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-stone-green to-stone-bronze mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogPosts.slice(0, 3).map((post, index) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                  {/* Decorative border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-bronze/10 to-stone-green/10 rounded-2xl p-1">
                    <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-stone-bronze text-white text-xs font-semibold rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-8">
                        <div className="flex items-center text-sm text-stone-gray mb-4">
                          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                          <span className="mx-3">•</span>
                          <span>5 min read</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-stone-dark mb-4 group-hover:text-stone-bronze transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-stone-gray leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                        
                        <div className="flex items-center text-stone-bronze font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with enhanced design */}
      <div className="relative py-16 bg-gradient-to-b from-white to-stone-cream/30">
        <div className="absolute inset-0 bg-stone-pattern opacity-5"></div>
        <div className="relative">
          <FAQ />
        </div>
      </div>
      
      {/* Final Section Separator */}
      <div className="py-12 bg-gradient-to-r from-stone-cream/40 via-stone-bronze/10 to-stone-cream/40">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-6">
            <div className="w-40 h-px bg-gradient-to-r from-transparent to-stone-bronze"></div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-stone-bronze rounded-full"></div>
              <div className="w-4 h-4 bg-stone-green rounded-full"></div>
              <div className="w-3 h-3 bg-stone-bronze rounded-full"></div>
            </div>
            <div className="w-40 h-px bg-gradient-to-l from-transparent to-stone-bronze"></div>
          </div>
        </div>
      </div>
      
      <EnhancedCTA />
      <Newsletter />
      <Footer />
      <BackToTop />
      <LiveChat />
    </div>
  );
}
