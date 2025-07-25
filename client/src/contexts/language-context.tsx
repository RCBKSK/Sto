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
    
    // About Page
    "about.title": "About Elegance Stone",
    "about.subtitle": "Crafting Excellence in Natural Stone for Over a Decade",
    
    // Services Page
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive Natural Stone Solutions",
    
    // Gallery Page
    "gallery.title": "Project Gallery",
    "gallery.subtitle": "Showcasing Our Finest Work",
    
    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch for your next project",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Message",
    "contact.send": "Send Message",
    
    // Blog Page
    "blog.title": "Latest News & Insights",
    "blog.subtitle": "Stay updated with the latest trends in natural stone",
    "blog.readTime": "min read",
    
    // Footer
    "footer.company": "Elegance Stone",
    "footer.description": "Premium natural stone supplier specializing in marble, granite, and custom stone solutions.",
    "footer.quickLinks": "Quick Links",
    "footer.ourServices": "Our Services",
    "footer.followUs": "Follow Us",
    "footer.allRightsReserved": "All rights reserved.",
    
    // Newsletter
    "newsletter.title": "Stay Updated",
    "newsletter.subtitle": "Subscribe to our newsletter for the latest news and exclusive offers",
    "newsletter.emailPlaceholder": "Enter your email address",
    "newsletter.subscribe": "Subscribe",
    "newsletter.success": "Thank you for subscribing!",
  },
  fa: {
    // Navigation
    "nav.home": "خانه",
    "nav.products": "محصولات",
    "nav.services": "خدمات",
    "nav.gallery": "گالری",
    "nav.about": "درباره ما",
    "nav.blog": "وبلاگ",
    "nav.contact": "تماس",
    "nav.getQuote": "دریافت قیمت",
    
    // Hero Section
    "hero.badge": "سنگ طبیعی درجه یک از سال ۲۰۱۰",
    "hero.title1": "شکوه با",
    "hero.title2": "سنگ طبیعی",
    "hero.title3": "بی‌زمان و استثنایی",
    "hero.description": "ما تأمین‌کننده نوآورانه سنگ طبیعی هستیم که به دلیل کیفیت استثنایی و طراحی‌های متمایز شناخته می‌شویم و در نمونه کارهای گسترده خود با بیش از ۵۵ محصول و ۴۰۰+ مرجع مواد ارائه شده‌اند.",
    "hero.experience": "بیش از ۱۵ سال تجربه",
    "hero.clients": "بیش از ۳۶۲ مشتری راضی",
    "hero.quality": "تضمین کیفیت درجه یک",
    "hero.exploreProducts": "کاوش محصولات",
    "hero.getFreeQuote": "دریافت قیمت رایگان",
    
    // Features
    "features.title": "چرا سنگ شکوه را انتخاب کنید؟",
    "features.subtitle": "ما متعهد به ارائه خدمات استثنایی و محصولات سنگ طبیعی درجه یک هستیم که از انتظارات شما فراتر می‌رود.",
    "features.qualityGuarantee": "تضمین کیفیت",
    "features.qualityDesc": "تمام محصولات سنگ طبیعی ما با تضمین کیفیت جامع و ضمانت ارائه می‌شوند.",
    "features.freeDelivery": "تحویل رایگان",
    "features.deliveryDesc": "خدمات تحویل رایگان برای سفارش‌های بالای ۵۰۰ دلار در منطقه خدمات ما.",
    "features.support": "پشتیبانی ۲۴/۷",
    "features.supportDesc": "پشتیبانی شبانه‌روزی مشتریان برای تمام سوالات و نگرانی‌های شما.",
    "features.premium": "مواد درجه یک",
    "features.premiumDesc": "از بهترین معادن سراسر جهان تهیه شده، کیفیت و زیبایی استثنایی را تضمین می‌کند.",
    "features.installation": "نصب سریع",
    "features.installationDesc": "خدمات نصب حرفه‌ای با کمترین اختلال در روتین روزانه شما.",
    "features.craftsmanship": "صنعتگری متخصص",
    "features.craftsmanshipDesc": "صنعتگران ماهر با دهه‌ها تجربه در نصب سنگ طبیعی.",
    
    // Collections
    "collections.title": "مجموعه‌های حرفه‌ای",
    "collections.subtitle": "انتخاب منحصربه‌فرد ما از مواد سنگ طبیعی درجه یک را کشف کنید",
    
    // Products
    "products.popular": "محبوب‌ترین محصولات ما",
    "products.popularSub": "انتخاب‌های دست‌چین از مجموعه درجه یک ما",
    "products.viewProduct": "مشاهده محصول",
    "products.sale": "حراج",
    "products.addToCart": "افزودن به سبد خرید",
    
    // Cart
    "cart.title": "سبد خرید",
    "cart.empty": "سبد خرید شما خالی است",
    "cart.items": "قلم",
    "cart.total": "مجموع",
    "cart.checkout": "تسویه حساب",
    "cart.remove": "حذف",
    "cart.quantity": "تعداد",
    
    // Payment
    "payment.title": "روش پرداخت",
    "payment.card": "کارت اعتباری/نقدی",
    "payment.crypto": "رمزارز",
    "payment.persian": "بانک ایرانی",
    "payment.processPayment": "پردازش پرداخت",
    "payment.cardNumber": "شماره کارت",
    "payment.expiryDate": "تاریخ انقضا",
    "payment.cvv": "کد CVV",
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
    
    // About Page
    "about.title": "درباره سنگ شکوه",
    "about.subtitle": "ایجاد تعالی در سنگ طبیعی بیش از یک دهه",
    
    // Services Page
    "services.title": "خدمات ما",
    "services.subtitle": "راه‌حل‌های جامع سنگ طبیعی",
    
    // Gallery Page
    "gallery.title": "گالری پروژه‌ها",
    "gallery.subtitle": "نمایش بهترین کارهای ما",
    
    // Contact Page
    "contact.title": "تماس با ما",
    "contact.subtitle": "برای پروژه بعدی خود با ما در تماس باشید",
    "contact.name": "نام کامل",
    "contact.email": "آدرس ایمیل",
    "contact.phone": "شماره تلفن",
    "contact.message": "پیام",
    "contact.send": "ارسال پیام",
    
    // Blog Page
    "blog.title": "آخرین اخبار و بینش‌ها",
    "blog.subtitle": "با آخرین ترندها در سنگ طبیعی به‌روز باشید",
    "blog.readTime": "دقیقه مطالعه",
    
    // Footer
    "footer.company": "سنگ شکوه",
    "footer.description": "تأمین‌کننده سنگ طبیعی درجه یک متخصص در مرمر، گرانیت و راه‌حل‌های سنگی سفارشی.",
    "footer.quickLinks": "لینک‌های سریع",
    "footer.ourServices": "خدمات ما",
    "footer.followUs": "ما را دنبال کنید",
    "footer.allRightsReserved": "تمام حقوق محفوظ است.",
    
    // Newsletter
    "newsletter.title": "به‌روز باشید",
    "newsletter.subtitle": "برای آخرین اخبار و پیشنهادات ویژه در خبرنامه ما مشترک شوید",
    "newsletter.emailPlaceholder": "آدرس ایمیل خود را وارد کنید",
    "newsletter.subscribe": "مشترک شوید",
    "newsletter.success": "از اشتراک شما متشکریم!",
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "fa")) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    
    // Update document direction for RTL
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "fa" ? "fa" : "en";
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
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