import { Express, Request, Response } from "express";
import { storage } from "./storage";
import { 
  insertAppointmentSchema,
  insertQuoteRequestSchema,
  insertCustomerReviewSchema,
  insertProjectGallerySchema,
  insertWishlistSchema,
  insertPriceCalculationSchema,
  insertChatMessageSchema,
  insertMaintenanceGuideSchema
} from "@shared/schema";

export async function registerEnhancedRoutes(app: Express) {
  // Appointments routes
  app.post("/api/appointments", async (req: Request, res: Response) => {
    try {
      const appointment = insertAppointmentSchema.parse(req.body);
      const result = await storage.createAppointment(appointment);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/appointments", async (req: Request, res: Response) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Quote Requests routes
  app.post("/api/quotes", async (req: Request, res: Response) => {
    try {
      const quote = insertQuoteRequestSchema.parse(req.body);
      const result = await storage.createQuoteRequest(quote);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/quotes", async (req: Request, res: Response) => {
    try {
      const quotes = await storage.getQuoteRequests();
      res.json(quotes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Customer Reviews routes
  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const review = insertCustomerReviewSchema.parse(req.body);
      const result = await storage.createCustomerReview(review);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/reviews", async (req: Request, res: Response) => {
    try {
      const reviews = await storage.getCustomerReviews();
      res.json(reviews);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/reviews/product/:productId", async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId);
      const reviews = await storage.getReviewsByProductId(productId);
      res.json(reviews);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Project Gallery routes
  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const project = insertProjectGallerySchema.parse(req.body);
      const result = await storage.createProjectGallery(project);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const projects = await storage.getProjectGallery();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/projects/featured", async (req: Request, res: Response) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Wishlist routes
  app.post("/api/wishlist", async (req: Request, res: Response) => {
    try {
      const wishlist = insertWishlistSchema.parse(req.body);
      const result = await storage.createWishlist(wishlist);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/wishlist/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const wishlist = await storage.getWishlistByUserId(userId);
      res.json(wishlist);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/wishlist/:userId/:productId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const productId = parseInt(req.params.productId);
      await storage.removeFromWishlist(userId, productId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Price Calculations routes
  app.post("/api/price-calculations", async (req: Request, res: Response) => {
    try {
      const calculation = insertPriceCalculationSchema.parse(req.body);
      const result = await storage.createPriceCalculation(calculation);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/price-calculations", async (req: Request, res: Response) => {
    try {
      const calculations = await storage.getPriceCalculations();
      res.json(calculations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Chat Messages routes
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const message = insertChatMessageSchema.parse(req.body);
      const result = await storage.createChatMessage(message);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/chat/:sessionId", async (req: Request, res: Response) => {
    try {
      const sessionId = req.params.sessionId;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Maintenance Guides routes
  app.post("/api/maintenance", async (req: Request, res: Response) => {
    try {
      const guide = insertMaintenanceGuideSchema.parse(req.body);
      const result = await storage.createMaintenanceGuide(guide);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/maintenance", async (req: Request, res: Response) => {
    try {
      const guides = await storage.getMaintenanceGuides();
      res.json(guides);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/maintenance/:stoneType", async (req: Request, res: Response) => {
    try {
      const stoneType = req.params.stoneType;
      const guides = await storage.getMaintenanceGuidesByStoneType(stoneType);
      res.json(guides);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}