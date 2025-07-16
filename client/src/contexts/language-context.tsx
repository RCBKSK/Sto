import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "fa";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.services": "Services",
    "nav.gallery": "Gallery",
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getQuote": "Get Quote",
    
    // Hero Section
    "hero.badge": "Premium Natural Stone Since 2010",
    "hero.title1": "Elegance with",
    "hero.title2": "Timeless",
    "hero.title3": "Natural Stone Cladding",
    "hero.description": "Cladding Natural Stone is an innovative natural stone supplier known for its exceptional quality and distinctive designs featured in our extensive portfolio of over 55 products with 400+ material references.",
    "hero.experience": "15+ Years Experience",
    "hero.clients": "362+ Happy Clients",
    "hero.quality": "Premium Quality Guaranteed",
    "hero.exploreProducts": "Explore Products",
    "hero.getFreeQuote": "Get Free Quote",
    
    // Features
    "features.title": "Why Choose Elegance Stone?",
    "features.subtitle": "We're committed to providing exceptional service and premium quality natural stone products that exceed your expectations.",
    "features.qualityGuarantee": "Quality Guarantee",
    "features.qualityDesc": "All our natural stone products come with a comprehensive quality guarantee and warranty.",
    "features.freeDelivery": "Free Delivery",
    "features.deliveryDesc": "Complimentary delivery service for orders over $500 within our service area.",
    "features.support": "24/7 Support",
    "features.supportDesc": "Round-the-clock customer support for all your questions and concerns.",
    "features.premium": "Premium Materials",
    "features.premiumDesc": "Sourced from the finest quarries worldwide, ensuring exceptional quality and beauty.",
    "features.installation": "Quick Installation",
    "features.installationDesc": "Professional installation service with minimal disruption to your daily routine.",
    "features.craftsmanship": "Expert Craftsmanship",
    "features.craftsmanshipDesc": "Skilled artisans with decades of experience in natural stone installation.",
    
    // Collections
    "collections.title": "Professional Collections",
    "collections.subtitle": "Discover our curated selection of premium natural stone materials",
    
    // Products
    "products.popular": "Our Most Popular Products",
    "products.popularSub": "Handpicked selections from our premium collection",
    "products.viewProduct": "View Product",
    "products.sale": "Sale",
    "products.addToCart": "Add to Cart",
    
    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.items": "items",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",
    "cart.quantity": "Quantity",
    
    // Payment
    "payment.title": "Payment Method",
    "payment.card": "Credit/Debit Card",
    "payment.crypto": "Cryptocurrency",
    "payment.persian": "Persian Bank",
    "payment.processPayment": "Process Payment",
    "payment.cardNumber": "Card Number",
    "payment.expiryDate": "Expiry Date",
    "payment.cvv": "CVV",
    "payment.cardHolder": "Card Holder Name",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.all": "All",
    "common.price": "Price",
    "common.category": "Category",
    "common.readMore": "Read More",
  },
  fa: {
    // Navigation
    "nav.home": "خانه",
    "nav.products": "محصولات",
    "nav.services": "خدمات",
    "nav.gallery": "گالری",
    "nav.about": "درباره ما",
    "nav.blog": "بلاگ",
    "nav.contact": "تماس",
    "nav.getQuote": "دریافت قیمت",
    
    // Hero Section
    "hero.badge": "سنگ طبیعی پریمیوم از سال ۲۰۱۰",
    "hero.title1": "زیبایی با",
    "hero.title2": "جاودانگی",
    "hero.title3": "نمای سنگ طبیعی",
    "hero.description": "شرکت نمای سنگ طبیعی، تامین کننده نوآور سنگ طبیعی است که به دلیل کیفیت استثنایی و طراحی‌های متمایز خود شناخته شده و دارای پورتفولیوی گسترده‌ای از بیش از ۵۵ محصول با ۴۰۰+ مرجع مواد است.",
    "hero.experience": "بیش از ۱۵ سال تجربه",
    "hero.clients": "بیش از ۳۶۲ مشتری راضی",
    "hero.quality": "تضمین کیفیت پریمیوم",
    "hero.exploreProducts": "مشاهده محصولات",
    "hero.getFreeQuote": "دریافت قیمت رایگان",
    
    // Features
    "features.title": "چرا سنگ اِلِگانس را انتخاب کنیم؟",
    "features.subtitle": "ما متعهد به ارائه خدمات استثنایی و محصولات سنگ طبیعی با کیفیت پریمیوم هستیم که فراتر از انتظارات شما باشد.",
    "features.qualityGuarantee": "تضمین کیفیت",
    "features.qualityDesc": "تمامی محصولات سنگ طبیعی ما با تضمین کیفیت جامع و گارانتی ارائه می‌شود.",
    "features.freeDelivery": "ارسال رایگان",
    "features.deliveryDesc": "خدمات ارسال رایگان برای سفارشات بالای ۵۰۰ دلار در منطقه خدماتی ما.",
    "features.support": "پشتیبانی ۲۴/۷",
    "features.supportDesc": "پشتیبانی مشتریان شبانه‌روزی برای تمامی سوالات و نگرانی‌های شما.",
    "features.premium": "مواد پریمیوم",
    "features.premiumDesc": "از بهترین معادن جهان تامین شده، کیفیت و زیبایی استثنایی را تضمین می‌کند.",
    "features.installation": "نصب سریع",
    "features.installationDesc": "خدمات نصب حرفه‌ای با کمترین اختلال در روتین روزانه شما.",
    "features.craftsmanship": "صنعتگری متخصص",
    "features.craftsmanshipDesc": "صنعتگران ماهر با دهه‌ها تجربه در نصب سنگ طبیعی.",
    
    // Collections
    "collections.title": "مجموعه‌های حرفه‌ای",
    "collections.subtitle": "انتخاب ویژه ما از مواد سنگ طبیعی پریمیوم را کشف کنید",
    
    // Products
    "products.popular": "محبوب‌ترین محصولات ما",
    "products.popularSub": "انتخاب دستی از مجموعه پریمیوم ما",
    "products.viewProduct": "مشاهده محصول",
    "products.sale": "فروش ویژه",
    "products.addToCart": "افزودن به سبد",
    
    // Cart
    "cart.title": "سبد خرید",
    "cart.empty": "سبد خرید شما خالی است",
    "cart.items": "آیتم",
    "cart.total": "مجموع",
    "cart.checkout": "پرداخت",
    "cart.remove": "حذف",
    "cart.quantity": "تعداد",
    
    // Payment
    "payment.title": "روش پرداخت",
    "payment.card": "کارت اعتباری/نقدی",
    "payment.crypto": "ارز دیجیتال",
    "payment.persian": "بانک ایرانی",
    "payment.processPayment": "پردازش پرداخت",
    "payment.cardNumber": "شماره کارت",
    "payment.expiryDate": "تاریخ انقضا",
    "payment.cvv": "CVV",
    "payment.cardHolder": "نام دارنده کارت",
    
    // Common
    "common.loading": "در حال بارگذاری...",
    "common.error": "خطا",
    "common.success": "موفقیت",
    "common.cancel": "لغو",
    "common.save": "ذخیره",
    "common.edit": "ویرایش",
    "common.delete": "حذف",
    "common.search": "جستجو",
    "common.filter": "فیلتر",
    "common.all": "همه",
    "common.price": "قیمت",
    "common.category": "دسته‌بندی",
    "common.readMore": "ادامه مطلب",
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "fa")) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}