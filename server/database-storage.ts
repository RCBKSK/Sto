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