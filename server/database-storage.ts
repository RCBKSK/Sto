
import { eq, and } from "drizzle-orm";
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
  maintenanceGuides, type MaintenanceGuide, type InsertMaintenanceGuide,
  pageContents, type PageContent, type InsertPageContent,
  websiteSettings, type WebsiteSetting, type InsertWebsiteSetting,
  seoSettings, type SeoSetting, type InsertSeoSetting,
  mediaLibrary, type MediaFile, type InsertMediaFile
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;

  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;

  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, updateData: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Comprehensive CMS Methods
  getPageContents(pageName?: string, language?: string): Promise<PageContent[]>;
  getPageContentBySection(pageName: string, sectionKey: string, language?: string): Promise<PageContent | undefined>;
  createPageContent(contentData: InsertPageContent): Promise<PageContent>;
  updatePageContent(id: number, updateData: Partial<PageContent>): Promise<PageContent>;
  deletePageContent(id: number): Promise<void>;

  getWebsiteSettings(): Promise<WebsiteSetting[]>;
  getWebsiteSettingByKey(key: string): Promise<WebsiteSetting | undefined>;
  createWebsiteSetting(setting: InsertWebsiteSetting): Promise<WebsiteSetting>;
  updateWebsiteSetting(id: number, updateData: Partial<WebsiteSetting>): Promise<WebsiteSetting>;
  
  getSeoSettings(language?: string): Promise<SeoSetting[]>;
  getSeoSettingByPage(pageName: string, language?: string): Promise<SeoSetting | undefined>;
  createSeoSetting(seoData: InsertSeoSetting): Promise<SeoSetting>;
  updateSeoSetting(id: number, updateData: Partial<SeoSetting>): Promise<SeoSetting>;
  deleteSeoSetting(id: number): Promise<void>;

  getMediaFiles(): Promise<MediaFile[]>;
  createMediaFile(media: InsertMediaFile): Promise<MediaFile>;
  updateMediaFile(id: number, updateData: Partial<MediaFile>): Promise<MediaFile>;
  deleteMediaFile(id: number): Promise<void>;

  // Enhanced feature methods
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

  async updateProduct(id: number, updateData: Partial<Product>): Promise<Product> {
    const [product] = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
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

  async updateBlogPost(id: number, updateData: Partial<BlogPost>): Promise<BlogPost> {
    const [result] = await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();

    if (!result) {
      throw new Error('Blog post not found');
    }

    return result;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Comprehensive Page Content Management
  async getPageContents(pageName?: string, language = 'en'): Promise<PageContent[]> {
    if (pageName) {
      return await db.select().from(pageContents)
        .where(and(eq(pageContents.pageName, pageName), eq(pageContents.language, language)));
    }
    return await db.select().from(pageContents).where(eq(pageContents.language, language));
  }

  async getPageContentBySection(pageName: string, sectionKey: string, language = 'en'): Promise<PageContent | undefined> {
    const [content] = await db.select().from(pageContents)
      .where(and(
        eq(pageContents.pageName, pageName),
        eq(pageContents.sectionKey, sectionKey),
        eq(pageContents.language, language)
      ));
    return content || undefined;
  }

  async createPageContent(contentData: InsertPageContent): Promise<PageContent> {
    const [content] = await db.insert(pageContents).values(contentData).returning();
    return content;
  }

  async updatePageContent(id: number, updateData: Partial<PageContent>): Promise<PageContent> {
    const [updated] = await db.update(pageContents)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(pageContents.id, id))
      .returning();
    
    if (!updated) {
      throw new Error('Page content not found');
    }
    return updated;
  }

  async deletePageContent(id: number): Promise<void> {
    await db.delete(pageContents).where(eq(pageContents.id, id));
  }

  // Website Settings Management
  async getWebsiteSettings(): Promise<WebsiteSetting[]> {
    return await db.select().from(websiteSettings);
  }

  async getWebsiteSettingByKey(key: string): Promise<WebsiteSetting | undefined> {
    const [setting] = await db.select().from(websiteSettings)
      .where(eq(websiteSettings.settingKey, key));
    return setting || undefined;
  }

  async createWebsiteSetting(setting: InsertWebsiteSetting): Promise<WebsiteSetting> {
    const [created] = await db.insert(websiteSettings).values(setting).returning();
    return created;
  }

  async updateWebsiteSetting(id: number, updateData: Partial<WebsiteSetting>): Promise<WebsiteSetting> {
    const [updated] = await db.update(websiteSettings)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(websiteSettings.id, id))
      .returning();
    
    if (!updated) {
      throw new Error('Website setting not found');
    }
    return updated;
  }

  // SEO Settings Management
  async getSeoSettings(language = 'en'): Promise<SeoSetting[]> {
    return await db.select().from(seoSettings)
      .where(eq(seoSettings.language, language));
  }

  async getSeoSettingByPage(pageName: string, language = 'en'): Promise<SeoSetting | undefined> {
    const [seo] = await db.select().from(seoSettings)
      .where(and(eq(seoSettings.pageName, pageName), eq(seoSettings.language, language)));
    return seo || undefined;
  }

  async createSeoSetting(seoData: InsertSeoSetting): Promise<SeoSetting> {
    const [seo] = await db.insert(seoSettings).values(seoData).returning();
    return seo;
  }

  async updateSeoSetting(id: number, updateData: Partial<SeoSetting>): Promise<SeoSetting> {
    const [updated] = await db.update(seoSettings)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(seoSettings.id, id))
      .returning();
    
    if (!updated) {
      throw new Error('SEO setting not found');
    }
    return updated;
  }

  async deleteSeoSetting(id: number): Promise<void> {
    await db.delete(seoSettings).where(eq(seoSettings.id, id));
  }

  // Media Library Management
  async getMediaFiles(): Promise<MediaFile[]> {
    return await db.select().from(mediaLibrary);
  }

  async createMediaFile(media: InsertMediaFile): Promise<MediaFile> {
    const [file] = await db.insert(mediaLibrary).values(media).returning();
    return file;
  }

  async updateMediaFile(id: number, updateData: Partial<MediaFile>): Promise<MediaFile> {
    const [updated] = await db.update(mediaLibrary)
      .set(updateData)
      .where(eq(mediaLibrary.id, id))
      .returning();
    
    if (!updated) {
      throw new Error('Media file not found');
    }
    return updated;
  }

  async deleteMediaFile(id: number): Promise<void> {
    await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
  }

  // Enhanced feature methods (existing implementations...)
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db.insert(appointments).values(insertAppointment).returning();
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }

  async createQuoteRequest(insertQuoteRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const [quoteRequest] = await db.insert(quoteRequests).values(insertQuoteRequest).returning();
    return quoteRequest;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return await db.select().from(quoteRequests);
  }

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

  async createWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    const [wishlist] = await db.insert(wishlists).values(insertWishlist).returning();
    return wishlist;
  }

  async getWishlistByUserId(userId: number): Promise<Wishlist[]> {
    return await db.select().from(wishlists).where(eq(wishlists.userId, userId));
  }

  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    await db.delete(wishlists)
      .where(and(eq(wishlists.userId, userId), eq(wishlists.productId, productId)));
  }

  async createPriceCalculation(insertCalculation: InsertPriceCalculation): Promise<PriceCalculation> {
    const [calculation] = await db.insert(priceCalculations).values(insertCalculation).returning();
    return calculation;
  }

  async getPriceCalculations(): Promise<PriceCalculation[]> {
    return await db.select().from(priceCalculations);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId));
  }

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
