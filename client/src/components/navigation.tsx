import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitcher from "@/components/language-switcher";
import CartButton from "@/components/cart-button";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t, language } = useLanguage();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.products"), href: "/products" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const productCategories = [
    { name: "Limestone", href: "/products?category=limestone" },
    { name: "Marble", href: "/products?category=marble" },
    { name: "Mosaic Tiles", href: "/products?category=mosaic" },
    { name: "Cladding", href: "/products?category=cladding" },
  ];

  return (
    <nav className={`bg-white/95 backdrop-blur-md shadow-stone sticky top-0 z-50 border-b border-stone-beige ${language === 'fa' ? 'font-vazir' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Enhanced Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-stone rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="font-bold text-xl text-stone-dark group-hover:text-stone-bronze transition-colors">
                <span className="text-stone-bronze">{language === 'fa' ? 'اِلِگانس' : 'Elegance'}</span> {language === 'fa' ? 'سنگ' : 'Stone'}
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              if (item.name === "Products") {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-stone-dark hover:text-stone-bronze hover:bg-stone-beige/50 transition-all duration-200 flex items-center"
                      >
                        {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link href="/products" className="w-full">
                          All Products
                        </Link>
                      </DropdownMenuItem>
                      {productCategories.map((category) => (
                        <DropdownMenuItem key={category.name}>
                          <Link href={category.href} className="w-full">
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-stone-dark hover:text-stone-bronze hover:bg-stone-beige/50 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location === item.href ? "text-stone-bronze bg-stone-beige/30" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <CartButton />
            <Button 
              asChild
              className="bg-gradient-stone hover:shadow-stone-lg text-white transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
              <Link href="/contact">{t("nav.getQuote")}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-dark hover:text-stone-bronze"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-stone-dark hover:text-stone-bronze transition-colors ${
                  location === item.href ? "text-stone-bronze" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
