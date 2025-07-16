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
      variant="ghost"
      size="sm"
      className="relative text-stone-dark hover:text-stone-bronze hover:bg-stone-beige/50 transition-all duration-200"
    >
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-stone-bronze text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}