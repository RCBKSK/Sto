export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  description: string;
  isOnSale: boolean;
  inStock: boolean;
  specifications?: {
    thickness: string[];
    finish: string[];
    size: string;
    origin: string;
    compressiveStrength: string;
    absorption: string;
  };
}

export const products: Product[] = [
  // Marble Collection
  {
    id: 1,
    name: "Carrara White Marble",
    category: "Marble",
    price: "145",
    originalPrice: "165",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400&h=400&fit=crop",
    description: "Premium Italian Carrara marble with distinctive grey veining. Perfect for countertops, flooring, and luxury applications.",
    isOnSale: true,
    inStock: true,
    specifications: {
      thickness: ["15mm", "20mm", "30mm"],
      finish: ["Polished", "Honed", "Brushed"],
      size: "Available in slabs and tiles",
      origin: "Carrara, Italy",
      compressiveStrength: "131 MPa",
      absorption: "0.18%"
    }
  },
  {
    id: 2,
    name: "Calacatta Gold Marble",
    category: "Marble",
    price: "285",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Luxurious Italian marble with dramatic gold and grey veining. The epitome of elegance for high-end projects.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["20mm", "30mm", "40mm"],
      finish: ["Polished", "Honed"],
      size: "Slab format only",
      origin: "Carrara, Italy",
      compressiveStrength: "125 MPa",
      absorption: "0.22%"
    }
  },
  {
    id: 3,
    name: "Emperador Dark Marble",
    category: "Marble",
    price: "125",
    image: "https://images.unsplash.com/photo-1615800001234-0123456789ab?w=400&h=400&fit=crop",
    description: "Rich brown marble with white veining patterns. Adds warmth and sophistication to any space.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["15mm", "20mm", "30mm"],
      finish: ["Polished", "Honed", "Antique"],
      size: "Slabs and tiles available",
      origin: "Spain",
      compressiveStrength: "118 MPa",
      absorption: "0.35%"
    }
  },
  {
    id: 4,
    name: "Nero Marquina Marble",
    category: "Marble",
    price: "165",
    image: "https://images.unsplash.com/photo-1541123481344-8ad1c6e3b5b4?w=400&h=400&fit=crop",
    description: "Striking black marble with distinctive white veining. Perfect for creating dramatic focal points.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["20mm", "30mm"],
      finish: ["Polished", "Honed"],
      size: "Slabs and custom sizes",
      origin: "Spain",
      compressiveStrength: "142 MPa",
      absorption: "0.15%"
    }
  },

  // Granite Collection
  {
    id: 5,
    name: "Black Galaxy Granite",
    category: "Granite",
    price: "95",
    originalPrice: "115",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Deep black granite with golden speckles resembling a starry night sky. Extremely durable and low maintenance.",
    isOnSale: true,
    inStock: true,
    specifications: {
      thickness: ["20mm", "30mm", "40mm"],
      finish: ["Polished", "Flamed", "Honed"],
      size: "Standard slabs",
      origin: "India",
      compressiveStrength: "195 MPa",
      absorption: "0.08%"
    }
  },
  {
    id: 6,
    name: "Kashmir White Granite",
    category: "Granite",
    price: "85",
    image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop",
    description: "Light grey granite with burgundy and black speckles. Versatile and elegant for any design scheme.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["15mm", "20mm", "30mm"],
      finish: ["Polished", "Honed", "Brushed"],
      size: "Slabs and tiles",
      origin: "India",
      compressiveStrength: "178 MPa",
      absorption: "0.12%"
    }
  },
  {
    id: 7,
    name: "Absolute Black Granite",
    category: "Granite",
    price: "75",
    image: "https://images.unsplash.com/photo-1541123481344-8ad1c6e3b5b4?w=400&h=400&fit=crop",
    description: "Pure black granite with minimal pattern variation. Perfect for modern and contemporary designs.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["20mm", "30mm"],
      finish: ["Polished", "Honed", "Leathered"],
      size: "Standard and custom slabs",
      origin: "India",
      compressiveStrength: "186 MPa",
      absorption: "0.06%"
    }
  },
  {
    id: 8,
    name: "Blue Pearl Granite",
    category: "Granite",
    price: "105",
    image: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400&h=400&fit=crop",
    description: "Distinctive blue-grey granite with metallic silver flecks. Creates stunning visual effects under light.",
    isOnSale: false,
    inStock: false,
    specifications: {
      thickness: ["20mm", "30mm"],
      finish: ["Polished", "Antique"],
      size: "Limited slab sizes",
      origin: "Norway",
      compressiveStrength: "168 MPa",
      absorption: "0.18%"
    }
  },

  // Quartzite Collection
  {
    id: 9,
    name: "White Ice Quartzite",
    category: "Quartzite",
    price: "195",
    image: "https://images.unsplash.com/photo-1541123481344-8ad1c6e3b5b4?w=400&h=400&fit=crop",
    description: "Pure white quartzite with subtle grey veining. Combines marble's beauty with granite's durability.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["20mm", "30mm"],
      finish: ["Polished", "Honed"],
      size: "Large format slabs",
      origin: "Brazil",
      compressiveStrength: "210 MPa",
      absorption: "0.08%"
    }
  },
  {
    id: 10,
    name: "Taj Mahal Quartzite",
    category: "Quartzite",
    price: "225",
    originalPrice: "255",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Warm beige quartzite with gold and cream veining. Reminiscent of the famous monument's marble.",
    isOnSale: true,
    inStock: true,
    specifications: {
      thickness: ["20mm", "30mm", "40mm"],
      finish: ["Polished", "Honed", "Leathered"],
      size: "Premium slab format",
      origin: "Brazil",
      compressiveStrength: "198 MPa",
      absorption: "0.12%"
    }
  },
  {
    id: 11,
    name: "Azul Macaubas Quartzite",
    category: "Quartzite",
    price: "285",
    image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop",
    description: "Rare blue quartzite with stunning wave-like patterns. An extraordinary stone for unique projects.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["30mm", "40mm"],
      finish: ["Polished", "Honed"],
      size: "Limited availability",
      origin: "Brazil",
      compressiveStrength: "205 MPa",
      absorption: "0.09%"
    }
  },

  // Limestone Collection
  {
    id: 12,
    name: "Jerusalem Gold Limestone",
    category: "Limestone",
    price: "65",
    image: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400&h=400&fit=crop",
    description: "Warm golden limestone with natural fossil patterns. Traditional Mediterranean beauty for classic designs.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["15mm", "20mm", "30mm"],
      finish: ["Honed", "Brushed", "Tumbled"],
      size: "Tiles and cut-to-size",
      origin: "Israel",
      compressiveStrength: "85 MPa",
      absorption: "1.2%"
    }
  },
  {
    id: 13,
    name: "French Limestone",
    category: "Limestone",
    price: "85",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400&h=400&fit=crop",
    description: "Classic French limestone in warm beige tones. Perfect for traditional and rustic applications.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["20mm", "30mm"],
      finish: ["Honed", "Antique", "Tumbled"],
      size: "Various formats available",
      origin: "France",
      compressiveStrength: "78 MPa",
      absorption: "1.8%"
    }
  },

  // Travertine Collection
  {
    id: 14,
    name: "Ivory Travertine",
    category: "Travertine",
    price: "55",
    originalPrice: "65",
    image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop",
    description: "Classic ivory travertine with natural pore patterns. Timeless elegance for interior and exterior use.",
    isOnSale: true,
    inStock: true,
    specifications: {
      thickness: ["15mm", "20mm", "30mm"],
      finish: ["Honed", "Tumbled", "Brushed"],
      size: "Tiles and slabs",
      origin: "Turkey",
      compressiveStrength: "65 MPa",
      absorption: "2.1%"
    }
  },
  {
    id: 15,
    name: "Noce Travertine",
    category: "Travertine",
    price: "65",
    image: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400&h=400&fit=crop",
    description: "Rich walnut-colored travertine with distinctive banding. Adds warmth to any architectural setting.",
    isOnSale: false,
    inStock: true,
    specifications: {
      thickness: ["15mm", "20mm", "30mm"],
      finish: ["Honed", "Filled", "Antique"],
      size: "Multiple formats",
      origin: "Turkey",
      compressiveStrength: "72 MPa",
      absorption: "1.9%"
    }
  },
  {
    id: 16,
    name: "Silver Travertine",
    category: "Travertine",
    price: "75",
    image: "https://images.unsplash.com/photo-1541123481344-8ad1c6e3b5b4?w=400&h=400&fit=crop",
    description: "Contemporary silver-grey travertine with subtle veining. Modern interpretation of a classic material.",
    isOnSale: false,
    inStock: false,
    specifications: {
      thickness: ["20mm", "30mm"],
      finish: ["Honed", "Filled", "Cross-cut"],
      size: "Large format tiles",
      origin: "Turkey",
      compressiveStrength: "68 MPa",
      absorption: "2.3%"
    }
  }
];

export const categories = ["All", "Marble", "Granite", "Quartzite", "Limestone", "Travertine"];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All" || category === "all" || category === "") {
    return products;
  }
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isOnSale || product.id <= 6);
};

export const getPopularProducts = (): Product[] => {
  return products.slice(0, 8);
};