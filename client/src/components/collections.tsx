import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import { EditableContent } from "@/components/cms/editable-content";

export default function Collections() {
  const { t, language } = useLanguage();
  const collections = [
    {
      name: "Premium Marble",
      description: "Luxurious marble with intricate veining patterns",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/products?category=marble",
      featured: true
    },
    {
      name: "Natural Limestone", 
      description: "Timeless limestone for elegant spaces",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/products?category=limestone",
      featured: false
    },
    {
      name: "Textured Stone Cladding",
      description: "Split-face cladding for stunning wall features",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
      href: "/products?category=cladding",
      featured: true
    },
    {
      name: "Designer Granite",
      description: "Durable granite in exotic colors and patterns",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/products?category=granite",
      featured: false
    },
    {
      name: "Artisan Mosaic Tiles",
      description: "Handcrafted mosaic designs for unique accents", 
      image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/products?category=mosaic",
      featured: true
    },
    {
      name: "Elegant Travertine",
      description: "Classic travertine with natural beauty",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/products?category=travertine", 
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-stone-bronze/10 rounded-full mb-4">
            <span className="text-stone-bronze font-semibold text-sm uppercase tracking-wide">Premium Collections</span>
          </div>
          <EditableContent
            pageName="home"
            sectionKey="collections_title"
            defaultContent="Our Stone Collections"
            className={`text-4xl md:text-6xl font-bold text-stone-dark mb-6 ${language === 'fa' ? 'font-vazir' : ''}`}
            as="h2"
            multiline={false}
          />
          <EditableContent
            pageName="home"
            sectionKey="collections_subtitle"
            defaultContent="Discover our curated selection of premium natural stones"
            className={`text-xl text-stone-gray max-w-3xl mx-auto ${language === 'fa' ? 'font-vazir' : ''}`}
            as="p"
            multiline={true}
          />
        </div>

        {/* Featured Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Large Featured Item */}
          <div className="lg:col-span-2">
            {collections.filter(c => c.featured)[0] && (
              <Link href={collections.filter(c => c.featured)[0].href} className="group cursor-pointer block">
                <div className="relative overflow-hidden rounded-2xl h-96 lg:h-[500px] shadow-2xl group-hover:shadow-stone-lg transition-all duration-500">
                  <img 
                    src={collections.filter(c => c.featured)[0].image}
                    alt={collections.filter(c => c.featured)[0].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/80 via-stone-dark/20 to-transparent"></div>
                  <div className="absolute inset-0 stone-pattern opacity-10"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-stone-gold/20 rounded-full animate-float"></div>
                  <div className="absolute bottom-16 right-16 w-8 h-8 bg-stone-bronze/30 rounded-full animate-float-delay"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="inline-block px-3 py-1 bg-stone-gold/90 text-stone-dark text-sm font-semibold rounded-full mb-4">
                      Featured Collection
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {collections.filter(c => c.featured)[0].name}
                    </h3>
                    <p className="text-lg text-stone-cream mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {collections.filter(c => c.featured)[0].description}
                    </p>
                    <div className="w-16 h-1 bg-stone-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Side Featured Items */}
          <div className="space-y-8">
            {collections.filter(c => c.featured).slice(1, 3).map((collection, index) => (
              <Link key={index} href={collection.href} className="group cursor-pointer block">
                <div className="relative overflow-hidden rounded-xl h-60 shadow-lg group-hover:shadow-stone-lg transition-all duration-300">
                  <img 
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {collection.name}
                    </h4>
                    <p className="text-sm text-stone-cream opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Regular Grid for Non-Featured Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.filter(c => !c.featured).map((collection, index) => (
            <Link key={index} href={collection.href} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl h-80 shadow-lg hover:shadow-stone-lg transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/60 via-transparent to-transparent group-hover:from-stone-dark/80 transition-all duration-300"></div>
                
                {/* Decorative corner element */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-stone-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h4 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {collection.name}
                  </h4>
                  <p className="text-sm text-stone-cream mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {collection.description}
                  </p>
                  <div className="w-12 h-0.5 bg-stone-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link href="/products" className="inline-flex items-center px-8 py-4 bg-gradient-stone text-white font-semibold rounded-xl hover:shadow-stone-lg transform hover:scale-105 transition-all duration-300">
            <span className={`${language === 'fa' ? 'font-vazir ml-2' : 'mr-2'}`}>
              {t("hero.exploreProducts")}
            </span>
            <svg className={`w-5 h-5 ${language === 'fa' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
