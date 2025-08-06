import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { EditableContent } from "@/components/cms/editable-content";

export default function Footer() {
  const { t, language } = useLanguage();
  return (
    <footer className="bg-gradient-to-br from-black via-stone-dark to-black text-white py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-32 h-32 bg-stone-bronze/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-stone-gold/5 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-stone rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="font-bold text-2xl">
                <EditableContent
                  pageName="global"
                  sectionKey="footer_company_name"
                  defaultContent="Elegance Stone"
                  className="text-stone-bronze"
                  multiline={false}
                />
              </div>
            </div>
            <EditableContent
              pageName="global"
              sectionKey="footer_description"
              defaultContent="Premium natural stone supplier specializing in cladding, tiles, and design solutions. Quality and craftsmanship since 2010."
              className="text-gray-400 mb-6 max-w-md leading-relaxed"
              as="p"
              multiline={true}
            />
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-stone-bronze transition-colors transform hover:scale-110 duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-stone-bronze transition-colors transform hover:scale-110 duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-stone-bronze transition-colors transform hover:scale-110 duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-stone-bronze transition-colors transform hover:scale-110 duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <EditableContent
              pageName="global"
              sectionKey="footer_quicklinks_title"
              defaultContent="Quick Links"
              className="font-semibold text-lg mb-4"
              as="h3"
              multiline={false}
            />
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors fluid-hover">{t("nav.home")}</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors fluid-hover">{t("nav.products")}</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors fluid-hover">{t("nav.services")}</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-white transition-colors fluid-hover">{t("nav.gallery")}</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors fluid-hover">{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors fluid-hover">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <EditableContent
              pageName="global"
              sectionKey="footer_services_title"
              defaultContent="Our Services"
              className="font-semibold text-lg mb-4"
              as="h3"
              multiline={false}
            />
            <ul className="space-y-2">
              <li><Link href="/products?category=limestone" className="text-gray-400 hover:text-white transition-colors">Limestone</Link></li>
              <li><Link href="/products?category=marble" className="text-gray-400 hover:text-white transition-colors">Marble</Link></li>
              <li><Link href="/products?category=mosaic" className="text-gray-400 hover:text-white transition-colors">Mosaic Tiles</Link></li>
              <li><Link href="/products?category=cladding" className="text-gray-400 hover:text-white transition-colors">Wall Cladding</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Natural Stone</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <EditableContent
            pageName="global"
            sectionKey="footer_copyright"
            defaultContent="© 2024 Elegance Stone. All rights reserved."
            className="text-gray-400"
            as="p"
            multiline={false}
          />
        </div>
      </div>
    </footer>
  );
}
