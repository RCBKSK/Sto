import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/language-context";
import { CartProvider } from "@/contexts/cart-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import Services from "@/pages/services";
import Gallery from "@/pages/gallery";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/services" component={Services} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
