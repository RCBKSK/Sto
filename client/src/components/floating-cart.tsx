import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const itemCount = getTotalItems();

  if (itemCount === 0) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-stone-bronze hover:bg-stone-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        </Button>
      </div>

      {/* Floating Cart Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 max-w-sm">
          <Card className="shadow-xl border-stone-bronze">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Shopping Cart</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-2 bg-stone-50 rounded-lg">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-stone-dark truncate">{item.name}</h4>
                      <p className="text-xs text-stone-gray">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="text-xs text-stone-gray text-center py-2">
                    +{items.length - 3} more items
                  </p>
                )}
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-stone-bronze">${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <Link href="/cart">View Cart</Link>
                  </Button>
                  <Button 
                    asChild 
                    size="sm"
                    className="flex-1 bg-stone-bronze hover:bg-stone-dark"
                  >
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}