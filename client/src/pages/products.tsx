import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PriceCalculator from "@/components/price-calculator";
import ARPreview from "@/components/ar-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Calculator, Scan } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Products() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryFilter = searchParams.get('category') || '';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [sortBy, setSortBy] = useState("name");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = ["All", "Limestone", "Marble", "Natural Stone", "Mosaic Tiles", "Cladding"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || 
                           product.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-dark mb-6">
              Our Products
            </h1>
            <p className="text-xl text-stone-gray max-w-2xl mx-auto">
              Discover our comprehensive collection of premium natural stone products, 
              carefully curated for exceptional quality and timeless beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-gray" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category === "All" ? "" : category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-bronze mx-auto"></div>
              <p className="mt-4 text-stone-gray">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-stone-gray">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                  <div className="relative">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isOnSale && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        Sale
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="absolute top-2 right-2 bg-gray-500 text-white">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-stone-bronze mb-1">{product.category}</div>
                    <h3 className="text-lg font-semibold text-stone-dark mb-2">{product.name}</h3>
                    <p className="text-sm text-stone-gray mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-stone-dark">
                        {product.originalPrice && (
                          <span className="line-through text-stone-gray text-sm mr-2">
                            ${product.originalPrice}
                          </span>
                        )}
                        ${product.price}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button 
                          size="sm" 
                          className="bg-stone-bronze hover:bg-orange-600 text-white"
                          disabled={!product.inStock}
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                        {product.inStock && (
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white flex-1"
                                >
                                  <Scan className="h-4 w-4 mr-1" />
                                  AR View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <ARPreview 
                                  productId={product.id} 
                                  productName={product.name}
                                  productImage={product.image}
                                />
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white flex-1"
                                >
                                  <Calculator className="h-4 w-4 mr-1" />
                                  Price
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <PriceCalculator 
                                  productId={product.id}
                                  productName={product.name}
                                  basePrice={parseFloat(product.price)}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
