import { users, products, contactInquiries, blogPosts, type User, type InsertUser, type Product, type InsertProduct, type ContactInquiry, type InsertContactInquiry, type BlogPost, type InsertBlogPost } from "@shared/schema";

// Use interface from database-storage
import { IStorage } from "./database-storage";

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private contactInquiries: Map<number, ContactInquiry>;
  private blogPosts: Map<number, BlogPost>;
  private currentUserId: number;
  private currentProductId: number;
  private currentInquiryId: number;
  private currentBlogId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.contactInquiries = new Map();
    this.blogPosts = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentInquiryId = 1;
    this.currentBlogId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample products
    const sampleProducts: (InsertProduct & { id: number })[] = [
      {
        id: 1,
        name: "Bianco Rhino",
        category: "Marble",
        price: "89.00",
        originalPrice: "99.00",
        description: "Premium white marble with dramatic veining patterns",
        image: "https://pixabay.com/get/g69bb38fe3d140a1de94c63eb2abe86d2729f16e1f9495342987388763858e036ff0af7a439d4891c99480babbeddfa28d19ffce1f3e1a1e4dce3d674444dcfe6_1280.jpg",
        isOnSale: true,
        inStock: true,
        specifications: "Available in various sizes, polished finish"
      },
      {
        id: 2,
        name: "Milano White",
        category: "Marble",
        price: "240.00",
        originalPrice: null,
        description: "Clean white marble surface with subtle veining",
        image: "https://pixabay.com/get/gc97fb0e1dcb35ffb35c4f5fdfa79bc327a75fd23adb58fd2110240984a25bdb1fc33f4d6dfe6574efdbd35bd2a85c4d8f107899810a25eadd414eaf94e35f055_1280.jpg",
        isOnSale: false,
        inStock: true,
        specifications: "Premium quality, suitable for countertops"
      },
      {
        id: 3,
        name: "Calacatta Gold",
        category: "Marble",
        price: "89.00",
        originalPrice: "99.00",
        description: "Luxurious gold-veined marble with elegant patterns",
        image: "https://pixabay.com/get/g920d01575668ce38b251056b35081499b6ec134fb522586a8027b4a7bbc56aee6fe16a7c688fd596a47c3451857b086ecf639c5d52562c76e82ba46075f78edb_1280.jpg",
        isOnSale: true,
        inStock: true,
        specifications: "High-end marble, perfect for luxury applications"
      },
      {
        id: 4,
        name: "Lilac Stone",
        category: "Limestone",
        price: "189.00",
        originalPrice: "199.00",
        description: "Soft lilac-colored limestone with natural texture",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        isOnSale: true,
        inStock: true,
        specifications: "Natural limestone, weather-resistant"
      },
      {
        id: 5,
        name: "Picasso Grey",
        category: "Natural Stone",
        price: "6000.00",
        originalPrice: null,
        description: "Artistic grey stone with unique patterns",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        isOnSale: false,
        inStock: true,
        specifications: "Unique patterns, perfect for statement walls"
      },
      {
        id: 6,
        name: "Verde Guatemala",
        category: "Natural Stone",
        price: "2900.00",
        originalPrice: "3400.00",
        description: "Rich green stone with natural patterns",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        isOnSale: true,
        inStock: true,
        specifications: "Natural green stone, excellent for accent walls"
      }
    ];

    sampleProducts.forEach(product => {
      const productData: Product = {
        ...product,
        originalPrice: product.originalPrice || null,
        isOnSale: product.isOnSale || false,
        inStock: product.inStock || true,
        specifications: product.specifications || null
      };
      this.products.set(product.id, productData);
      this.currentProductId = Math.max(this.currentProductId, product.id + 1);
    });

    // Sample blog posts
    const sampleBlogPosts: (InsertBlogPost & { id: number; publishedAt: Date })[] = [
      {
        id: 1,
        title: "The Timeless Beauty of Marble: Enhancing Your Home's Aesthetics",
        slug: "timeless-beauty-of-marble",
        excerpt: "Discover how marble can transform your living spaces with its elegant patterns and luxurious appeal.",
        content: "Marble has been a symbol of luxury and elegance for centuries...",
        image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        category: "Installation",
        publishedAt: new Date("2023-04-27")
      },
      {
        id: 2,
        title: "Choosing the Perfect Tiles for Your Kitchen Renovation",
        slug: "perfect-tiles-kitchen-renovation",
        excerpt: "Expert tips on selecting the right natural stone tiles for your kitchen renovation project.",
        content: "When renovating your kitchen, choosing the right tiles is crucial...",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        category: "Remodelling",
        publishedAt: new Date("2023-04-27")
      },
      {
        id: 3,
        title: "Flooring Trends: Exploring the Latest Styles and Designs",
        slug: "flooring-trends-latest-styles",
        excerpt: "Stay ahead of the curve with the latest flooring trends and innovative design approaches.",
        content: "The world of flooring is constantly evolving with new trends...",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        category: "3D Design",
        publishedAt: new Date("2023-02-18")
      }
    ];

    sampleBlogPosts.forEach(post => {
      const blogPost: BlogPost = {
        ...post,
        publishedAt: post.publishedAt
      };
      this.blogPosts.set(post.id, blogPost);
      this.currentBlogId = Math.max(this.currentBlogId, post.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = {
      ...insertProduct,
      id,
      originalPrice: insertProduct.originalPrice || null,
      isOnSale: insertProduct.isOnSale || false,
      inStock: insertProduct.inStock || true,
      specifications: insertProduct.specifications || null
    };
    this.products.set(id, product);
    return product;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: ContactInquiry = { 
      ...insertInquiry,
      id,
      phone: insertInquiry.phone || null,
      projectType: insertInquiry.projectType || null,
      createdAt: new Date() 
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values());
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      publishedAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }
}

// Import database storage
import { DatabaseStorage } from "./database-storage";

// Temporarily use DatabaseStorage for all environments to avoid interface conflicts
export const storage = new DatabaseStorage();
