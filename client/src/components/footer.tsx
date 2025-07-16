import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
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
                <span className="text-stone-bronze">Elegance</span> Stone
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Leading provider of premium natural stone cladding, tiles, and design solutions. 
              Transforming spaces with timeless elegance and exceptional quality since 2010.
            </p>
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
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
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
          <p className="text-gray-400">
            © 2024 Elegance Stone. All rights reserved. | 
            <a href="#" className="hover:text-white transition-colors ml-2">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
