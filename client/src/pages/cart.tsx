import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const { t, language } = useLanguage();

  const formatPrice = (price: number) => {
    return language === 'fa' 
      ? `${price.toFixed(2)} تومان`
      : `$${price.toFixed(2)}`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-stone-gray mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-stone-dark mb-4">{t("cart.empty")}</h1>
            <Button asChild className="bg-gradient-stone hover:shadow-stone-lg text-white">
              <Link href="/products">{t("hero.exploreProducts")}</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${language === 'fa' ? 'font-vazir' : ''}`}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-stone-dark mb-8">{t("cart.title")}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-stone-dark">{item.name}</h3>
                      <p className="text-sm text-stone-gray">{item.category}</p>
                      <p className="text-lg font-bold text-stone-bronze mt-2">
                        {formatPrice(parseFloat(item.price))}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t("cart.items")}: {getTotalItems()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t("cart.total")}:</span>
                    <span className="text-stone-bronze">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  className="w-full bg-gradient-stone hover:shadow-stone-lg text-white"
                >
                  <Link href="/checkout">{t("cart.checkout")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}