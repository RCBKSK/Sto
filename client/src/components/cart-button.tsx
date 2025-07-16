import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export default function CartButton() {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="relative border-stone-bronze text-stone-bronze hover:bg-stone-bronze hover:text-white transition-all duration-200 shadow-sm"
    >
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5 mr-2" />
        Cart
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}