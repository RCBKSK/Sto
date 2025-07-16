import { pgTable, text, varchar, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  description: text("description").notNull(),
  image: text("image").notNull(),
  isOnSale: boolean("is_on_sale").default(false),
  inStock: boolean("in_stock").default(true),
  specifications: text("specifications"),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  projectType: text("project_type"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
});

// Enhanced schemas for new features
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  projectType: varchar("project_type", { length: 100 }),
  preferredDate: timestamp("preferred_date"),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  projectType: varchar("project_type", { length: 100 }),
  area: decimal("area", { precision: 10, scale: 2 }),
  materials: text("materials").array(),
  description: text("description"),
  attachments: text("attachments").array(),
  estimatedPrice: decimal("estimated_price", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const customerReviews = pgTable("customer_reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 255 }),
  comment: text("comment"),
  images: text("images").array(),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectGallery = pgTable("project_gallery", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  beforeImage: text("before_image"),
  afterImage: text("after_image"),
  category: varchar("category", { length: 100 }),
  materials: text("materials").array(),
  duration: varchar("duration", { length: 100 }),
  area: decimal("area", { precision: 10, scale: 2 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wishlists = pgTable("wishlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  productId: integer("product_id").references(() => products.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const priceCalculations = pgTable("price_calculations", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  area: decimal("area", { precision: 10, scale: 2 }).notNull(),
  thickness: varchar("thickness", { length: 50 }),
  finish: varchar("finish", { length: 100 }),
  installation: boolean("installation").default(false),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  senderType: varchar("sender_type", { length: 50 }).notNull(), // 'customer' or 'agent'
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const maintenanceGuides = pgTable("maintenance_guides", {
  id: serial("id").primaryKey(),
  stoneType: varchar("stone_type", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  frequency: varchar("frequency", { length: 100 }),
  difficulty: varchar("difficulty", { length: 50 }),
  tools: text("tools").array(),
  steps: text("steps").array(),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas for new tables
export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
  estimatedPrice: true,
});

export const insertCustomerReviewSchema = createInsertSchema(customerReviews).omit({
  id: true,
  createdAt: true,
  verified: true,
});

export const insertProjectGallerySchema = createInsertSchema(projectGallery).omit({
  id: true,
  createdAt: true,
});

export const insertWishlistSchema = createInsertSchema(wishlists).omit({
  id: true,
  createdAt: true,
});

export const insertPriceCalculationSchema = createInsertSchema(priceCalculations).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
  isRead: true,
});

export const insertMaintenanceGuideSchema = createInsertSchema(maintenanceGuides).omit({
  id: true,
  createdAt: true,
});

// Original types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

// New types
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type CustomerReview = typeof customerReviews.$inferSelect;
export type InsertCustomerReview = z.infer<typeof insertCustomerReviewSchema>;
export type ProjectGallery = typeof projectGallery.$inferSelect;
export type InsertProjectGallery = z.infer<typeof insertProjectGallerySchema>;
export type Wishlist = typeof wishlists.$inferSelect;
export type InsertWishlist = z.infer<typeof insertWishlistSchema>;
export type PriceCalculation = typeof priceCalculations.$inferSelect;
export type InsertPriceCalculation = z.infer<typeof insertPriceCalculationSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type MaintenanceGuide = typeof maintenanceGuides.$inferSelect;
export type InsertMaintenanceGuide = z.infer<typeof insertMaintenanceGuideSchema>;
