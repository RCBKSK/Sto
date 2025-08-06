import { eq } from "drizzle-orm";
import { db } from "./db";
import { 
  users, type User, type InsertUser, 
  products, type Product, type InsertProduct, 
  contactInquiries, type ContactInquiry, type InsertContactInquiry, 
  blogPosts, type BlogPost, type InsertBlogPost,
  appointments, type Appointment, type InsertAppointment,
  quoteRequests, type QuoteRequest, type InsertQuoteRequest,
  customerReviews, type CustomerReview, type InsertCustomerReview,
  projectGallery, type ProjectGallery, type InsertProjectGallery,
  wishlists, type Wishlist, type InsertWishlist,
  priceCalculations, type PriceCalculation, type InsertPriceCalculation,
  chatMessages, type ChatMessage, type InsertChatMessage,
  maintenanceGuides, type MaintenanceGuide, type InsertMaintenanceGuide
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;

  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, updateData: any): Promise<any>;

  // Page Content Management
  getPageContent(): Promise<any[]>;
  createPageContent(contentData: any): Promise<any>;
  updatePageContent(id: number, updateData: any): Promise<any>;

  // SEO Settings Management
  getSeoSettings(): Promise<any[]>;
  createSeoSettings(seoData: any): Promise<any>;
  updateSeoSettings(id: number, updateData: any): Promise<any>;


  // New methods for enhanced features
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;

  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;

  createCustomerReview(review: InsertCustomerReview): Promise<CustomerReview>;
  getCustomerReviews(): Promise<CustomerReview[]>;
  getReviewsByProductId(productId: number): Promise<CustomerReview[]>;

  createProjectGallery(project: InsertProjectGallery): Promise<ProjectGallery>;
  getProjectGallery(): Promise<ProjectGallery[]>;
  getFeaturedProjects(): Promise<ProjectGallery[]>;

  createWishlist(wishlist: InsertWishlist): Promise<Wishlist>;
  getWishlistByUserId(userId: number): Promise<Wishlist[]>;
  removeFromWishlist(userId: number, productId: number): Promise<void>;

  createPriceCalculation(calculation: InsertPriceCalculation): Promise<PriceCalculation>;
  getPriceCalculations(): Promise<PriceCalculation[]>;

  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;

  createMaintenanceGuide(guide: InsertMaintenanceGuide): Promise<MaintenanceGuide>;
  getMaintenanceGuides(): Promise<MaintenanceGuide[]>;
  getMaintenanceGuidesByStoneType(stoneType: string): Promise<MaintenanceGuide[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  // Contact Inquiry methods
  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [inquiry] = await db.insert(contactInquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries);
  }

  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: number, updateData: any): Promise<any> {
    const result = await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error('Blog post not found');
    }

    return result[0];
  }

  // Page Content Management (stub implementations for DatabaseStorage)
  async getPageContent(): Promise<any[]> {
    // Return sample page content for now
    return [
      {
        id: 1,
        pageName: 'home',
        title: 'Home Page',
        content: '<h1>Welcome to Elegance Stone</h1><p>Premium natural stone supplier offering the finest marble, granite, and limestone.</p>',
        metaDescription: 'Premium natural stone supplier - marble, granite, limestone',
        isPublished: true,
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        pageName: 'about',
        title: 'About Us',
        content: '<h1>About Elegance Stone</h1><p>We have been providing premium natural stone solutions for over two decades.</p>',
        metaDescription: 'Learn about Elegance Stone - premium natural stone specialists',
        isPublished: true,
        updatedAt: new Date().toISOString()
      }
    ];
  }

  async createPageContent(contentData: any): Promise<any> {
    const newContent = {
      id: Date.now(), // Simple ID generation
      ...contentData,
      updatedAt: new Date().toISOString()
    };
    return newContent;
  }

  async updatePageContent(id: number, updateData: any): Promise<any> {
    const updated = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return updated;
  }

  // SEO Settings Management (stub implementations for DatabaseStorage)
  async getSeoSettings(): Promise<any[]> {
    // Return sample SEO settings for now
    return [
      {
        id: 1,
        pageName: 'home',
        title: 'Elegance Stone - Premium Natural Stone Supplier',
        description: 'Premium natural stone supplier offering marble, granite, limestone. Professional installation and design services.',
        keywords: 'marble, granite, limestone, natural stone, stone supplier',
        ogTitle: 'Elegance Stone - Premium Natural Stone',
        ogDescription: 'Transform your space with premium natural stone from Elegance Stone',
        ogImage: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1200&h=630',
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        pageName: 'products',
        title: 'Natural Stone Products - Marble, Granite & Limestone',
        description: 'Explore our extensive collection of premium natural stone products including marble, granite, and limestone.',
        keywords: 'marble products, granite slabs, limestone tiles, natural stone collection',
        ogTitle: 'Premium Natural Stone Products',
        ogDescription: 'Discover our extensive collection of premium natural stone',
        ogImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630',
        updatedAt: new Date().toISOString()
      }
    ];
  }

  async createSeoSettings(seoData: any): Promise<any> {
    const newSeoSettings = {
      id: Date.now(), // Simple ID generation
      ...seoData,
      updatedAt: new Date().toISOString()
    };
    return newSeoSettings;
  }

  async updateSeoSettings(id: number, updateData: any): Promise<any> {
    const updated = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return updated;
  }


  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db.insert(appointments).values(insertAppointment).returning();
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }

  // Quote Request methods
  async createQuoteRequest(insertQuoteRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const [quoteRequest] = await db.insert(quoteRequests).values(insertQuoteRequest).returning();
    return quoteRequest;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return await db.select().from(quoteRequests);
  }

  // Customer Review methods
  async createCustomerReview(insertReview: InsertCustomerReview): Promise<CustomerReview> {
    const [review] = await db.insert(customerReviews).values(insertReview).returning();
    return review;
  }

  async getCustomerReviews(): Promise<CustomerReview[]> {
    return await db.select().from(customerReviews);
  }

  async getReviewsByProductId(productId: number): Promise<CustomerReview[]> {
    return await db.select().from(customerReviews).where(eq(customerReviews.productId, productId));
  }

  // Project Gallery methods
  async createProjectGallery(insertProject: InsertProjectGallery): Promise<ProjectGallery> {
    const [project] = await db.insert(projectGallery).values(insertProject).returning();
    return project;
  }

  async getProjectGallery(): Promise<ProjectGallery[]> {
    return await db.select().from(projectGallery);
  }

  async getFeaturedProjects(): Promise<ProjectGallery[]> {
    return await db.select().from(projectGallery).where(eq(projectGallery.featured, true));
  }

  // Wishlist methods
  async createWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    const [wishlist] = await db.insert(wishlists).values(insertWishlist).returning();
    return wishlist;
  }

  async getWishlistByUserId(userId: number): Promise<Wishlist[]> {
    return await db.select().from(wishlists).where(eq(wishlists.userId, userId));
  }

  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    await db.delete(wishlists)
      .where(eq(wishlists.userId, userId))
      .where(eq(wishlists.productId, productId));
  }

  // Price Calculation methods
  async createPriceCalculation(insertCalculation: InsertPriceCalculation): Promise<PriceCalculation> {
    const [calculation] = await db.insert(priceCalculations).values(insertCalculation).returning();
    return calculation;
  }

  async getPriceCalculations(): Promise<PriceCalculation[]> {
    return await db.select().from(priceCalculations);
  }

  // Chat Message methods
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId));
  }

  // Maintenance Guide methods
  async createMaintenanceGuide(insertGuide: InsertMaintenanceGuide): Promise<MaintenanceGuide> {
    const [guide] = await db.insert(maintenanceGuides).values(insertGuide).returning();
    return guide;
  }

  async getMaintenanceGuides(): Promise<MaintenanceGuide[]> {
    return await db.select().from(maintenanceGuides);
  }

  async getMaintenanceGuidesByStoneType(stoneType: string): Promise<MaintenanceGuide[]> {
    return await db.select().from(maintenanceGuides).where(eq(maintenanceGuides.stoneType, stoneType));
  }
}

export const storage = new DatabaseStorage();