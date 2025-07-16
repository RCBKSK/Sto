import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Bathrooms", "Kitchens", "Fireplaces", "Walls", "Floors"];

  const galleryItems = [
    {
      id: 1,
      title: "Modern Bathroom with Marble Features",
      category: "Bathrooms",
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Luxurious bathroom featuring Calacatta marble countertops and shower walls"
    },
    {
      id: 2,
      title: "Kitchen with Natural Stone Countertops",
      category: "Kitchens", 
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Elegant kitchen showcasing granite countertops with waterfall edge"
    },
    {
      id: 3,
      title: "Limestone Cladding Wall Installation",
      category: "Walls",
      image: "https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Textured limestone cladding creating a stunning accent wall"
    },
    {
      id: 4,
      title: "Mosaic Tile Bathroom Design",
      category: "Bathrooms",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Intricate mosaic tile work in a contemporary bathroom setting"
    },
    {
      id: 5,
      title: "Natural Stone Fireplace",
      category: "Fireplaces",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Dramatic stone fireplace as the centerpiece of the living room"
    },
    {
      id: 6,
      title: "Contemporary Bathroom Design",
      category: "Bathrooms",
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Modern bathroom with sleek stone finishes and minimalist design"
    },
    {
      id: 7,
      title: "Marble Kitchen Island",
      category: "Kitchens",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Stunning marble kitchen island with integrated storage solutions"
    },
    {
      id: 8,
      title: "Stone Floor Installation",
      category: "Floors",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Beautiful natural stone flooring with rich textures and patterns"
    },
    {
      id: 9,
      title: "Outdoor Stone Patio",
      category: "Floors",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Durable stone patio perfect for outdoor entertaining"
    }
  ];

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-dark mb-6">
              Project Gallery
            </h1>
            <p className="text-xl text-stone-gray max-w-2xl mx-auto">
              Explore our portfolio of completed projects showcasing the beauty and versatility 
              of natural stone in various applications.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-stone-bronze hover:bg-orange-600 text-white" 
                  : "text-stone-dark hover:text-stone-bronze"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-stone-bronze text-white">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-stone-dark mb-2">{item.title}</h3>
                      <p className="text-sm text-stone-gray">{item.description}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="relative">
                    <div className="sr-only">
                      <h2>Gallery Image</h2>
                      <p>Viewing detailed image of {item.title}</p>
                    </div>
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-stone-dark">{item.title}</h3>
                        <Badge className="bg-stone-bronze text-white">{item.category}</Badge>
                      </div>
                      <p className="text-stone-gray">{item.description}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
