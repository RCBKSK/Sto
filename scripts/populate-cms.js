import { db } from '../server/db.js';
import { pageContents, websiteSettings, seoSettings } from '../shared/schema.js';

// Comprehensive content for all website pages
const contentData = [
  // Home Page Content - English
  { pageName: 'home', sectionKey: 'hero_title', contentType: 'text', content: 'Premium Natural Stone Cladding', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'hero_subtitle', contentType: 'text', content: 'Transform your space with our exquisite collection of natural stones', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'hero_cta_primary', contentType: 'text', content: 'Explore Collection', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'hero_cta_secondary', contentType: 'text', content: 'Get Quote', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'features_title', contentType: 'text', content: 'Why Choose Elegance Stone', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'features_subtitle', contentType: 'text', content: 'Discover the excellence that sets us apart', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'collections_title', contentType: 'text', content: 'Our Stone Collections', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'collections_subtitle', contentType: 'text', content: 'Each stone tells a unique story of natural beauty', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'cta_title', contentType: 'text', content: 'Ready to Transform Your Space?', language: 'en', isPublished: true },
  { pageName: 'home', sectionKey: 'cta_subtitle', contentType: 'text', content: 'Get expert consultation and premium stone solutions', language: 'en', isPublished: true },
  
  // Home Page Content - Persian
  { pageName: 'home', sectionKey: 'hero_title', contentType: 'text', content: 'روکش سنگ طبیعی پریمیوم', language: 'fa', isPublished: true },
  { pageName: 'home', sectionKey: 'hero_subtitle', contentType: 'text', content: 'فضای خود را با مجموعه زیبای سنگ‌های طبیعی ما متحول کنید', language: 'fa', isPublished: true },
  { pageName: 'home', sectionKey: 'hero_cta_primary', contentType: 'text', content: 'مشاهده مجموعه', language: 'fa', isPublished: true },
  { pageName: 'home', sectionKey: 'hero_cta_secondary', contentType: 'text', content: 'دریافت قیمت', language: 'fa', isPublished: true },
  { pageName: 'home', sectionKey: 'features_title', contentType: 'text', content: 'چرا سنگ زیبایی را انتخاب کنید', language: 'fa', isPublished: true },
  { pageName: 'home', sectionKey: 'features_subtitle', contentType: 'text', content: 'تمایز ما را کشف کنید', language: 'fa', isPublished: true },
  
  // About Page Content - English
  { pageName: 'about', sectionKey: 'hero_title', contentType: 'text', content: 'About Elegance Stone', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'hero_subtitle', contentType: 'text', content: 'Leading supplier of premium natural stone solutions', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'company_story_title', contentType: 'text', content: 'Our Story', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'company_story', contentType: 'html', content: '<p>With over two decades of experience in the natural stone industry, Elegance Stone has established itself as a trusted partner for architects, designers, and homeowners seeking exceptional quality and craftsmanship.</p><p>Our journey began with a simple mission: to bring the timeless beauty of natural stone to modern spaces while maintaining the highest standards of quality and sustainability.</p>', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'mission_title', contentType: 'text', content: 'Our Mission', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'mission_statement', contentType: 'text', content: 'To provide the finest natural stone products while maintaining sustainable practices and exceptional customer service.', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'values_title', contentType: 'text', content: 'Our Values', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'quality_title', contentType: 'text', content: 'Quality Excellence', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'quality_description', contentType: 'text', content: 'Every stone is carefully selected and inspected to meet our rigorous quality standards.', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'sustainability_title', contentType: 'text', content: 'Sustainable Practices', language: 'en', isPublished: true },
  { pageName: 'about', sectionKey: 'sustainability_description', contentType: 'text', content: 'We are committed to environmentally responsible sourcing and processing methods.', language: 'en', isPublished: true },
  
  // Products Page Content - English
  { pageName: 'products', sectionKey: 'hero_title', contentType: 'text', content: 'Our Stone Collection', language: 'en', isPublished: true },
  { pageName: 'products', sectionKey: 'hero_subtitle', contentType: 'text', content: 'Discover our comprehensive range of natural stones', language: 'en', isPublished: true },
  { pageName: 'products', sectionKey: 'categories_title', contentType: 'text', content: 'Stone Categories', language: 'en', isPublished: true },
  { pageName: 'products', sectionKey: 'categories_subtitle', contentType: 'text', content: 'Explore our diverse collection of premium natural stones', language: 'en', isPublished: true },
  { pageName: 'products', sectionKey: 'featured_title', contentType: 'text', content: 'Featured Products', language: 'en', isPublished: true },
  { pageName: 'products', sectionKey: 'featured_description', contentType: 'text', content: 'Each stone is carefully selected for its unique beauty, durability, and character', language: 'en', isPublished: true },
  
  // Services Page Content - English
  { pageName: 'services', sectionKey: 'hero_title', contentType: 'text', content: 'Our Services', language: 'en', isPublished: true },
  { pageName: 'services', sectionKey: 'hero_subtitle', contentType: 'text', content: 'Comprehensive stone solutions from consultation to installation', language: 'en', isPublished: true },
  { pageName: 'services', sectionKey: 'consultation_title', contentType: 'text', content: 'Design Consultation', language: 'en', isPublished: true },
  { pageName: 'services', sectionKey: 'consultation_description', contentType: 'text', content: 'Expert guidance to help you choose the perfect stone for your project', language: 'en', isPublished: true },
  { pageName: 'services', sectionKey: 'installation_title', contentType: 'text', content: 'Professional Installation', language: 'en', isPublished: true },
  { pageName: 'services', sectionKey: 'installation_description', contentType: 'text', content: 'Skilled craftsmen ensure flawless installation of your chosen stones', language: 'en', isPublished: true },
  { pageName: 'services', sectionKey: 'maintenance_title', contentType: 'text', content: 'Maintenance & Care', language: 'en', isPublished: true },
  { pageName: 'services', sectionKey: 'maintenance_description', contentType: 'text', content: 'Ongoing support to keep your stone surfaces looking their best', language: 'en', isPublished: true },
  
  // Gallery Page Content - English
  { pageName: 'gallery', sectionKey: 'hero_title', contentType: 'text', content: 'Project Gallery', language: 'en', isPublished: true },
  { pageName: 'gallery', sectionKey: 'hero_subtitle', contentType: 'text', content: 'Explore stunning projects featuring our natural stones', language: 'en', isPublished: true },
  { pageName: 'gallery', sectionKey: 'featured_projects_title', contentType: 'text', content: 'Featured Projects', language: 'en', isPublished: true },
  { pageName: 'gallery', sectionKey: 'project_categories_title', contentType: 'text', content: 'Project Categories', language: 'en', isPublished: true },
  
  // Blog Page Content - English
  { pageName: 'blog', sectionKey: 'hero_title', contentType: 'text', content: 'Stone Insights & Trends', language: 'en', isPublished: true },
  { pageName: 'blog', sectionKey: 'hero_subtitle', contentType: 'text', content: 'Expert insights, design trends, and maintenance tips', language: 'en', isPublished: true },
  { pageName: 'blog', sectionKey: 'latest_posts_title', contentType: 'text', content: 'Latest Articles', language: 'en', isPublished: true },
  { pageName: 'blog', sectionKey: 'categories_title', contentType: 'text', content: 'Article Categories', language: 'en', isPublished: true },
  
  // Contact Page Content - English
  { pageName: 'contact', sectionKey: 'hero_title', contentType: 'text', content: 'Get In Touch', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'hero_subtitle', contentType: 'text', content: 'Ready to start your stone project? Contact our experts today', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'contact_info_title', contentType: 'text', content: 'Contact Information', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'office_address', contentType: 'text', content: '123 Stone Avenue, Design District, City 12345', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'phone_number', contentType: 'text', content: '+1 (555) 123-4567', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'email_address', contentType: 'text', content: 'info@elegancestone.com', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'business_hours_title', contentType: 'text', content: 'Business Hours', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'business_hours', contentType: 'text', content: 'Monday - Friday: 9:00 AM - 6:00 PM\\nSaturday: 10:00 AM - 4:00 PM\\nSunday: Closed', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'form_title', contentType: 'text', content: 'Send Us a Message', language: 'en', isPublished: true },
  { pageName: 'contact', sectionKey: 'form_subtitle', contentType: 'text', content: 'Fill out the form below and we\'ll get back to you within 24 hours', language: 'en', isPublished: true }
];

// Website settings
const settingsData = [
  { settingKey: 'site_name', settingValue: 'Elegance Stone', description: 'Website name' },
  { settingKey: 'site_tagline', settingValue: 'Premium Natural Stone Solutions', description: 'Website tagline' },
  { settingKey: 'company_phone', settingValue: '+1 (555) 123-4567', description: 'Main contact phone number' },
  { settingKey: 'company_email', settingValue: 'info@elegancestone.com', description: 'Main contact email' },
  { settingKey: 'company_address', settingValue: '123 Stone Avenue, Design District, City 12345', description: 'Company address' },
  { settingKey: 'business_hours', settingValue: 'Monday - Friday: 9:00 AM - 6:00 PM', description: 'Business operating hours' },
  { settingKey: 'social_facebook', settingValue: 'https://facebook.com/elegancestone', description: 'Facebook page URL' },
  { settingKey: 'social_instagram', settingValue: 'https://instagram.com/elegancestone', description: 'Instagram page URL' },
  { settingKey: 'social_linkedin', settingValue: 'https://linkedin.com/company/elegancestone', description: 'LinkedIn page URL' },
  { settingKey: 'footer_copyright', settingValue: '© 2025 Elegance Stone. All rights reserved.', description: 'Footer copyright text' },
  { settingKey: 'google_analytics_id', settingValue: '', description: 'Google Analytics tracking ID' },
  { settingKey: 'maintenance_mode', settingValue: false, description: 'Enable/disable maintenance mode' }
];

// SEO settings for all pages
const seoData = [
  { pageName: 'home', title: 'Premium Natural Stone Cladding - Elegance Stone', description: 'Transform your space with our exquisite collection of natural stones. Premium marble, granite, quartzite, and limestone for residential and commercial projects.', keywords: 'natural stone, stone cladding, marble, granite, quartzite, limestone, premium stone', language: 'en' },
  { pageName: 'about', title: 'About Us - Leading Stone Supplier | Elegance Stone', description: 'Learn about Elegance Stone, your trusted partner for premium natural stone solutions. Over 20 years of experience in quality stone products and services.', keywords: 'about elegance stone, stone supplier, natural stone company, stone experience', language: 'en' },
  { pageName: 'products', title: 'Natural Stone Collection - Premium Products | Elegance Stone', description: 'Explore our comprehensive collection of natural stones including marble, granite, quartzite, limestone, and travertine. Each stone carefully selected for beauty and durability.', keywords: 'stone collection, marble products, granite collection, quartzite stones, limestone products', language: 'en' },
  { pageName: 'services', title: 'Stone Services - Consultation & Installation | Elegance Stone', description: 'Comprehensive stone solutions from design consultation to professional installation. Expert guidance and skilled craftsmen for your stone project.', keywords: 'stone services, stone installation, design consultation, stone maintenance, professional installation', language: 'en' },
  { pageName: 'gallery', title: 'Project Gallery - Stone Installation Examples | Elegance Stone', description: 'Browse our stunning project gallery showcasing natural stone installations. Get inspired by our completed residential and commercial stone projects.', keywords: 'stone gallery, project examples, stone installations, stone projects, design inspiration', language: 'en' },
  { pageName: 'blog', title: 'Stone Insights & Trends - Expert Articles | Elegance Stone', description: 'Expert insights on natural stone trends, maintenance tips, and design inspiration. Stay updated with the latest in natural stone applications.', keywords: 'stone articles, stone trends, maintenance tips, stone design, stone care', language: 'en' },
  { pageName: 'contact', title: 'Contact Us - Get Your Stone Quote | Elegance Stone', description: 'Ready to start your stone project? Contact our experts for consultation and quotes. Visit our showroom or reach out online for premium stone solutions.', keywords: 'contact stone supplier, stone quote, stone consultation, stone showroom, stone experts', language: 'en' }
];

async function populateCMS() {
  try {
    console.log('Populating CMS with comprehensive content...');
    
    // Insert page contents
    for (const content of contentData) {
      await db.insert(pageContents).values(content).onConflictDoNothing();
    }
    console.log('✓ Page contents inserted');
    
    // Insert website settings
    for (const setting of settingsData) {
      await db.insert(websiteSettings).values(setting).onConflictDoNothing();
    }
    console.log('✓ Website settings inserted');
    
    // Insert SEO settings
    for (const seo of seoData) {
      await db.insert(seoSettings).values(seo).onConflictDoNothing();
    }
    console.log('✓ SEO settings inserted');
    
    console.log('🎉 CMS populated successfully with all content!');
  } catch (error) {
    console.error('Error populating CMS:', error);
  }
}

populateCMS();