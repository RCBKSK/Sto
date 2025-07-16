import { Link } from "wouter";

export default function Collections() {
  const collections = [
    {
      name: "Limestone",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      href: "/products?category=limestone"
    },
    {
      name: "Marble",
      image: "https://pixabay.com/get/g07094314e5e162bffeffc446cd93c656c9a78682ecbefceb6e41d72d56a5779c20801b9bbbceadee6839d5a015b4afaa04e62bc42c02e827d5fda34947918100_1280.jpg",
      href: "/products?category=marble"
    },
    {
      name: "Glacier Split Face Cladding",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      href: "/products?category=cladding"
    },
    {
      name: "Decorative & Mosaic Tiles",
      image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      href: "/products?category=mosaic"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">Professional Collections</h2>
          <p className="text-xl text-stone-gray">Discover our curated selection of premium natural stone materials</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Link key={index} href={collection.href} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl h-80 mb-4">
                <img 
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-stone-dark/20 group-hover:bg-stone-dark/40 transition-colors"></div>
              </div>
              <h3 className="text-xl font-semibold text-stone-dark group-hover:text-stone-bronze transition-colors">
                {collection.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
