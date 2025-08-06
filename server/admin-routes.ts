import type { Express } from "express";
import { storage } from "./storage";

export function registerAdminRoutes(app: Express) {
  // Dashboard stats endpoint
  app.get('/api/admin/dashboard/stats/:timeRange?', async (req, res) => {
    try {
      const stats = {
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0,
        totalProducts: (await storage.getProducts()).length,
        pendingInquiries: (await storage.getContactInquiries()).length,
        newReviews: 0,
        conversionRate: 2.9,
        avgOrderValue: 450
      };
      res.json(stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ message: 'Failed to fetch stats' });
    }
  });

  // Recent orders endpoint
  app.get('/api/admin/dashboard/recent-orders', async (req, res) => {
    try {
      const orders = [
        {
          id: 1,
          orderNumber: 'ORD-001',
          customerName: 'John Doe',
          total: '450.00',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ];
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });

  // Recent activity endpoint
  app.get('/api/admin/dashboard/recent-activity', async (req, res) => {
    try {
      const activity = [
        {
          id: 1,
          type: 'order',
          title: 'New order received',
          description: 'Order #ORD-001 from John Doe',
          timestamp: new Date().toISOString()
        }
      ];
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch activity' });
    }
  });

  // Orders endpoints
  app.get('/api/admin/orders', async (req, res) => {
    try {
      const orders = [];
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });

  app.put('/api/admin/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      // Mock update
      res.json({ message: 'Order updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order' });
    }
  });

  // Reviews endpoints
  app.get('/api/admin/reviews', async (req, res) => {
    try {
      const reviews = [];
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews' });
    }
  });

  app.put('/api/admin/reviews/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      // Mock update
      res.json({ message: 'Review updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update review' });
    }
  });

  app.delete('/api/admin/reviews/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // Mock delete
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete review' });
    }
  });

  // Appointments endpoints
  app.get('/api/admin/appointments', async (req, res) => {
    try {
      const appointments = [];
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch appointments' });
    }
  });

  app.put('/api/admin/appointments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      // Mock update
      res.json({ message: 'Appointment updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update appointment' });
    }
  });

  // Content management endpoints
  app.get('/api/admin/page-content', async (req, res) => {
    try {
      const content = await storage.getPageContent();
      res.json(content);
    } catch (error) {
      console.error('Error fetching page content:', error);
      res.status(500).json({ message: 'Failed to fetch page content' });
    }
  });

  app.post('/api/admin/page-content', async (req, res) => {
    try {
      const contentData = req.body;
      const result = await storage.createPageContent(contentData);
      res.json(result);
    } catch (error) {
      console.error('Error creating page content:', error);
      res.status(500).json({ message: 'Failed to create page content' });
    }
  });

  app.put('/api/admin/page-content/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await storage.updatePageContent(parseInt(id), updateData);
      res.json(result);
    } catch (error) {
      console.error('Error updating page content:', error);
      res.status(500).json({ message: 'Failed to update page content' });
    }
  });

  // SEO settings endpoints
  app.get('/api/admin/seo-settings', async (req, res) => {
    try {
      const seoSettings = await storage.getSeoSettings();
      res.json(seoSettings);
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      res.status(500).json({ message: 'Failed to fetch SEO settings' });
    }
  });

  app.post('/api/admin/seo-settings', async (req, res) => {
    try {
      const seoData = req.body;
      const result = await storage.createSeoSettings(seoData);
      res.json(result);
    } catch (error) {
      console.error('Error creating SEO settings:', error);
      res.status(500).json({ message: 'Failed to create SEO settings' });
    }
  });

  app.put('/api/admin/seo-settings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await storage.updateSeoSettings(parseInt(id), updateData);
      res.json(result);
    } catch (error) {
      console.error('Error updating SEO settings:', error);
      res.status(500).json({ message: 'Failed to update SEO settings' });
    }
  });

  // Analytics endpoint
  app.get('/api/admin/analytics/:timeRange?', async (req, res) => {
    try {
      const analytics = {
        revenue: [],
        orders: [],
        visitors: [],
        topProducts: [],
        topPages: [],
        customerSegments: [],
        conversionFunnel: []
      };
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch analytics' });
    }
  });

  // Settings endpoints
  app.get('/api/admin/settings', async (req, res) => {
    try {
      const settings = {
        id: 1,
        siteName: 'Elegance Stone',
        siteDescription: 'Premium natural stone supplier',
        contactEmail: 'info@elegancestone.com',
        contactPhone: '+1 (555) 123-4567',
        businessHours: 'Monday - Friday: 9AM - 6PM',
        address: '123 Stone Avenue\nNew York, NY 10001',
        currency: 'USD',
        taxRate: '8.25',
        shippingRate: '15.00',
        freeShippingThreshold: '500.00',
        maintenanceMode: false,
        updatedAt: new Date().toISOString()
      };
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch settings' });
    }
  });

  app.put('/api/admin/settings', async (req, res) => {
    try {
      const updateData = req.body;
      // Mock update
      res.json({ message: 'Settings updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update settings' });
    }
  });

  // Payment methods endpoints
  app.get('/api/admin/payment-methods', async (req, res) => {
    try {
      const paymentMethods = [
        {
          id: 1,
          name: 'Stripe',
          type: 'stripe',
          isEnabled: true,
          config: null,
          processingFee: '2.9'
        },
        {
          id: 2,
          name: 'PayPal',
          type: 'paypal',
          isEnabled: true,
          config: null,
          processingFee: '3.5'
        }
      ];
      res.json(paymentMethods);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch payment methods' });
    }
  });

  app.put('/api/admin/payment-methods/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      // Mock update
      res.json({ message: 'Payment method updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update payment method' });
    }
  });

  // Delete contact inquiry
  app.delete('/api/contact/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // Mock delete
      res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete inquiry' });
    }
  });
}