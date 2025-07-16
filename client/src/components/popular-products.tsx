import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { Product } from "@shared/schema";

export default function PopularProducts() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-bronze mx-auto"></div>
            <p className="mt-4 text-stone-gray">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">Our Most Popular Products</h2>
          <p className="text-xl text-stone-gray">Handpicked selections from our premium collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden shadow-stone hover:shadow-stone-lg transition-all duration-300 group transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.isOnSale && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                    Sale
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="text-sm text-stone-bronze mb-2 font-medium">{product.category}</div>
                <h3 className="text-xl font-semibold text-stone-dark mb-3 group-hover:text-stone-bronze transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-stone-dark">
                    {product.originalPrice && (
                      <span className="line-through text-stone-gray text-lg mr-2">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="text-stone-bronze">${product.price}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-stone hover:shadow-stone-lg text-white transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href={`/products/${product.id}`}>
                    View Product
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg" 
            className="bg-stone-dark hover:bg-gray-700 text-white"
          >
            <Link href="/products">
              <ArrowRight className="mr-2 h-5 w-5" />
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
