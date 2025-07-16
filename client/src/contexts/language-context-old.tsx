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
    "about.description": "Founded in 2010, Elegance Stone has been at the forefront of natural stone supply and installation. We specialize in premium marble, granite, travertine, and slate products that transform spaces into works of art.",
    "about.mission": "Our Mission",
    "about.missionText": "To provide the highest quality natural stone products with exceptional craftsmanship and unparalleled customer service.",
    "about.vision": "Our Vision",
    "about.visionText": "To be the leading natural stone supplier, setting industry standards for quality, innovation, and sustainability.",
    
    // Services Page
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive Natural Stone Solutions",
    "services.consultation": "Design Consultation",
    "services.consultationDesc": "Expert design advice to help you choose the perfect stone for your project.",
    "services.installation": "Professional Installation",
    "services.installationDesc": "Skilled craftsmen ensure perfect installation with attention to every detail.",
    "services.maintenance": "Maintenance & Restoration",
    "services.maintenanceDesc": "Keep your natural stone looking pristine with our maintenance services.",
    
    // Gallery Page
    "gallery.title": "Project Gallery",
    "gallery.subtitle": "Showcasing Our Finest Work",
    "gallery.category.all": "All Projects",
    "gallery.category.residential": "Residential",
    "gallery.category.commercial": "Commercial",
    "gallery.category.outdoor": "Outdoor",
    
    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch for your next project",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.projectType": "Project Type",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.info": "Contact Information",
    "contact.address": "Address",
    "contact.workingHours": "Working Hours",
    "contact.mondayFriday": "Monday - Friday: 8:00 AM - 6:00 PM",
    "contact.saturday": "Saturday: 9:00 AM - 4:00 PM",
    "contact.sunday": "Sunday: Closed",
    
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
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfService": "Terms of Service",
    
    // Newsletter
    "newsletter.title": "Stay Updated",
    "newsletter.subtitle": "Subscribe to our newsletter for the latest news and exclusive offers",
    "newsletter.emailPlaceholder": "Enter your email address",
    "newsletter.subscribe": "Subscribe",
    "newsletter.success": "Thank you for subscribing!",
    "blog.author": "By",
    "blog.categories": "Categories",
    "blog.tags": "Tags",
    "blog.relatedPosts": "Related Posts",
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
    "about.description": "سنگ شکوه که در سال ۲۰۱۰ تأسیس شد، در خط مقدم تأمین و نصب سنگ طبیعی قرار دارد. ما در محصولات درجه یک مرمر، گرانیت، تراورتن و آردواز تخصص داریم که فضاها را به آثار هنری تبدیل می‌کنند.",
    "about.mission": "ماموریت ما",
    "about.missionText": "ارائه محصولات سنگ طبیعی با بالاترین کیفیت همراه با صنعتگری استثنایی و خدمات مشتری بی‌نظیر.",
    "about.vision": "چشم‌انداز ما",
    "about.visionText": "پیشرو در تأمین سنگ طبیعی و تعیین استانداردهای صنعت برای کیفیت، نوآوری و پایداری.",
    
    // Services Page
    "services.title": "خدمات ما",
    "services.subtitle": "راه‌حل‌های جامع سنگ طبیعی",
    "services.consultation": "مشاوره طراحی",
    "services.consultationDesc": "مشاوره متخصص طراحی برای کمک به انتخاب سنگ مناسب برای پروژه شما.",
    "services.installation": "نصب حرفه‌ای",
    "services.installationDesc": "صنعتگران ماهر نصب کامل را با توجه به هر جزئیات تضمین می‌کنند.",
    "services.maintenance": "نگهداری و بازسازی",
    "services.maintenanceDesc": "سنگ طبیعی خود را با خدمات نگهداری ما بکر نگه دارید.",
    
    // Gallery Page
    "gallery.title": "گالری پروژه‌ها",
    "gallery.subtitle": "نمایش بهترین کارهای ما",
    "gallery.category.all": "تمام پروژه‌ها",
    "gallery.category.residential": "مسکونی",
    "gallery.category.commercial": "تجاری",
    "gallery.category.outdoor": "فضای باز",
    
    // Contact Page
    "contact.title": "تماس با ما",
    "contact.subtitle": "برای پروژه بعدی خود با ما در تماس باشید",
    "contact.name": "نام کامل",
    "contact.email": "آدرس ایمیل",
    "contact.phone": "شماره تلفن",
    "contact.projectType": "نوع پروژه",
    "contact.message": "پیام",
    "contact.send": "ارسال پیام",
    "contact.info": "اطلاعات تماس",
    "contact.address": "آدرس",
    "contact.workingHours": "ساعات کاری",
    "contact.mondayFriday": "دوشنبه - جمعه: ۸:۰۰ تا ۱۸:۰۰",
    "contact.saturday": "شنبه: ۹:۰۰ تا ۱۶:۰۰",
    "contact.sunday": "یکشنبه: تعطیل",
    
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
    "footer.privacyPolicy": "سیاست حفظ حریم خصوصی",
    "footer.termsOfService": "شرایط خدمات",
    
    // Newsletter
    "newsletter.title": "به‌روز باشید",
    "newsletter.subtitle": "برای آخرین اخبار و پیشنهادات ویژه در خبرنامه ما مشترک شوید",
    "newsletter.emailPlaceholder": "آدرس ایمیل خود را وارد کنید",
    "newsletter.subscribe": "مشترک شوید",
    "newsletter.success": "از اشتراک شما متشکریم!",
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
    
    // About Page
    "about.title": "درباره سنگ اِلِگانس",
    "about.subtitle": "ساخت تعالی در سنگ طبیعی برای بیش از یک دهه",
    "about.description": "سنگ اِلِگانس که در سال ۲۰۱۰ تاسیس شد، در زمینه تامین و نصب سنگ طبیعی پیشرو بوده است. ما در محصولات مرمر، گرانیت، تراورتن و لاشه پریمیوم تخصص داریم که فضاها را به آثار هنری تبدیل می‌کند.",
    "about.mission": "مأموریت ما",
    "about.missionText": "ارائه بالاترین کیفیت محصولات سنگ طبیعی با صنعتگری استثنایی و خدمات مشتریان بی‌نظیر.",
    "about.vision": "چشم‌انداز ما",
    "about.visionText": "پیشرو در تامین سنگ طبیعی و تعیین استانداردهای صنعتی برای کیفیت، نوآوری و پایداری.",
    
    // Services Page
    "services.title": "خدمات ما",
    "services.subtitle": "راه‌حل‌های جامع سنگ طبیعی",
    "services.consultation": "مشاوره طراحی",
    "services.consultationDesc": "مشاوره تخصصی طراحی برای انتخاب سنگ مناسب پروژه شما.",
    "services.installation": "نصب حرفه‌ای",
    "services.installationDesc": "صنعتگران ماهر نصب کامل با توجه به تمام جزئیات را تضمین می‌کنند.",
    "services.maintenance": "نگهداری و بازسازی",
    "services.maintenanceDesc": "سنگ طبیعی خود را با خدمات نگهداری ما در حالت بکر نگه دارید.",
    
    // Gallery Page
    "gallery.title": "گالری پروژه",
    "gallery.subtitle": "نمایش بهترین کارهای ما",
    "gallery.category.all": "تمام پروژه‌ها",
    "gallery.category.residential": "مسکونی",
    "gallery.category.commercial": "تجاری",
    "gallery.category.outdoor": "فضای باز",
    
    // Contact Page
    "contact.title": "تماس با ما",
    "contact.subtitle": "برای پروژه بعدی خود با ما در تماس باشید",
    "contact.name": "نام کامل",
    "contact.email": "آدرس ایمیل",
    "contact.phone": "شماره تلفن",
    "contact.projectType": "نوع پروژه",
    "contact.message": "پیام",
    "contact.send": "ارسال پیام",
    "contact.info": "اطلاعات تماس",
    "contact.address": "آدرس",
    "contact.workingHours": "ساعات کاری",
    "contact.mondayFriday": "دوشنبه - جمعه: ۸:۰۰ صبح - ۶:۰۰ عصر",
    "contact.saturday": "شنبه: ۹:۰۰ صبح - ۴:۰۰ عصر",
    "contact.sunday": "یکشنبه: تعطیل",
    
    // Blog Page
    "blog.title": "آخرین اخبار و بینش‌ها",
    "blog.subtitle": "با آخرین روندهای سنگ طبیعی به‌روز بمانید",
    "blog.readTime": "دقیقه مطالعه",
    "blog.author": "توسط",
    "blog.categories": "دسته‌بندی‌ها",
    "blog.tags": "برچسب‌ها",
    "blog.relatedPosts": "مطالب مرتبط",
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