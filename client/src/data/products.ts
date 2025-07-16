// Product data types and utilities
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  inStock: boolean;
}

export const productCategories: ProductCategory[] = [
  {
    id: "limestone",
    name: "Limestone",
    description: "Natural limestone with beautiful textures and durability",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
  },
  {
    id: "marble",
    name: "Marble",
    description: "Premium marble with elegant veining and luxury appeal",
    image: "https://pixabay.com/get/g07094314e5e162bffeffc446cd93c656c9a78682ecbefceb6e41d72d56a5779c20801b9bbbceadee6839d5a015b4afaa04e62bc42c02e827d5fda34947918100_1280.jpg"
  },
  {
    id: "cladding",
    name: "Stone Cladding",
    description: "Textured stone cladding for dramatic wall installations",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
  },
  {
    id: "mosaic",
    name: "Mosaic Tiles",
    description: "Decorative mosaic tiles for intricate designs",
    image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
  }
];

export const getProductsByCategory = (categoryId: string) => {
  // This would typically fetch from an API or database
  // Implementation depends on the backend data source
  return [];
};

export const getProductSpecifications = (productId: string): ProductSpecification[] => {
  // Return product specifications based on product ID
  // Implementation depends on the data source
  return [];
};

export const getProductVariants = (productId: string): ProductVariant[] => {
  // Return product variants based on product ID
  // Implementation depends on the data source
  return [];
};

export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(numPrice);
};

export const calculateDiscountPercentage = (originalPrice: string, salePrice: string): number => {
  const original = parseFloat(originalPrice);
  const sale = parseFloat(salePrice);
  return Math.round(((original - sale) / original) * 100);
};
