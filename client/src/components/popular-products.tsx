import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { getPopularProducts } from "@/data/products";

export default function PopularProducts() {
  // Use local popular products data
  const products = getPopularProducts();
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: t("common.success"),
      description: `${product.name} added to cart`,
    });
  };



  return (
    <section className={`py-20 bg-gray-50 ${language === 'fa' ? 'font-vazir' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">{t("products.popular")}</h2>
          <p className="text-xl text-stone-gray">{t("products.popularSub")}</p>
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
                    {t("products.sale")}
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
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-gradient-stone hover:shadow-stone-lg text-white transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link href={`/products/${product.id}`}>
                      {t("products.viewProduct")}
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-stone-bronze hover:bg-stone-dark text-white"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
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
              <ArrowRight className={`h-5 w-5 ${language === 'fa' ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {t("hero.exploreProducts")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
