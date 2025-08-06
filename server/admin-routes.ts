
import type { Express } from "express";
import { storage } from "./storage";

export function registerAdminRoutes(app: Express) {
  // Dashboard stats endpoints
  app.get('/api/admin/stats', async (req, res) => {
    try {
      const [products, orders, inquiries, reviews] = await Promise.all([
        storage.getProducts(),
        [], // Orders will be implemented later
        storage.getContactInquiries(),
        storage.getCustomerReviews(),
      ]);

      const stats = {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalInquiries: inquiries.length,
        totalReviews: reviews.length,
        recentInquiries: inquiries.slice(-5),
        recentReviews: reviews.slice(-3),
      };

      res.json(stats);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      res.status(500).json({ message: 'Failed to fetch admin stats' });
    }
  });

  // Comprehensive Page Content Management
  app.get('/api/admin/page-content', async (req, res) => {
    try {
      const { page, language } = req.query;
      const content = await storage.getPageContents(
        page as string, 
        (language as string) || 'en'
      );
      res.json(content);
    } catch (error) {
      console.error('Error fetching page content:', error);
      res.status(500).json({ message: 'Failed to fetch page content' });
    }
  });

  app.get('/api/admin/page-content/:pageName/:sectionKey', async (req, res) => {
    try {
      const { pageName, sectionKey } = req.params;
      const { language } = req.query;
      const content = await storage.getPageContentBySection(
        pageName, 
        sectionKey, 
        (language as string) || 'en'
      );
      res.json(content);
    } catch (error) {
      console.error('Error fetching page content section:', error);
      res.status(500).json({ message: 'Failed to fetch page content section' });
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

  app.delete('/api/admin/page-content/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePageContent(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting page content:', error);
      res.status(500).json({ message: 'Failed to delete page content' });
    }
  });

  // Website Settings Management
  app.get('/api/admin/website-settings', async (req, res) => {
    try {
      const settings = await storage.getWebsiteSettings();
      res.json(settings);
    } catch (error) {
      console.error('Error fetching website settings:', error);
      res.status(500).json({ message: 'Failed to fetch website settings' });
    }
  });

  app.get('/api/admin/website-settings/:key', async (req, res) => {
    try {
      const { key } = req.params;
      const setting = await storage.getWebsiteSettingByKey(key);
      res.json(setting);
    } catch (error) {
      console.error('Error fetching website setting:', error);
      res.status(500).json({ message: 'Failed to fetch website setting' });
    }
  });

  app.post('/api/admin/website-settings', async (req, res) => {
    try {
      const settingData = req.body;
      const result = await storage.createWebsiteSetting(settingData);
      res.json(result);
    } catch (error) {
      console.error('Error creating website setting:', error);
      res.status(500).json({ message: 'Failed to create website setting' });
    }
  });

  app.put('/api/admin/website-settings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await storage.updateWebsiteSetting(parseInt(id), updateData);
      res.json(result);
    } catch (error) {
      console.error('Error updating website setting:', error);
      res.status(500).json({ message: 'Failed to update website setting' });
    }
  });

  // SEO Settings Management
  app.get('/api/admin/seo-settings', async (req, res) => {
    try {
      const { language } = req.query;
      const seoSettings = await storage.getSeoSettings((language as string) || 'en');
      res.json(seoSettings);
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      res.status(500).json({ message: 'Failed to fetch SEO settings' });
    }
  });

  app.get('/api/admin/seo-settings/:pageName', async (req, res) => {
    try {
      const { pageName } = req.params;
      const { language } = req.query;
      const seoSetting = await storage.getSeoSettingByPage(
        pageName, 
        (language as string) || 'en'
      );
      res.json(seoSetting);
    } catch (error) {
      console.error('Error fetching SEO setting:', error);
      res.status(500).json({ message: 'Failed to fetch SEO setting' });
    }
  });

  app.post('/api/admin/seo-settings', async (req, res) => {
    try {
      const seoData = req.body;
      const result = await storage.createSeoSetting(seoData);
      res.json(result);
    } catch (error) {
      console.error('Error creating SEO setting:', error);
      res.status(500).json({ message: 'Failed to create SEO setting' });
    }
  });

  app.put('/api/admin/seo-settings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await storage.updateSeoSetting(parseInt(id), updateData);
      res.json(result);
    } catch (error) {
      console.error('Error updating SEO setting:', error);
      res.status(500).json({ message: 'Failed to update SEO setting' });
    }
  });

  app.delete('/api/admin/seo-settings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteSeoSetting(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting SEO setting:', error);
      res.status(500).json({ message: 'Failed to delete SEO setting' });
    }
  });

  // Media Library Management
  app.get('/api/admin/media', async (req, res) => {
    try {
      const media = await storage.getMediaFiles();
      res.json(media);
    } catch (error) {
      console.error('Error fetching media files:', error);
      res.status(500).json({ message: 'Failed to fetch media files' });
    }
  });

  app.post('/api/admin/media', async (req, res) => {
    try {
      const mediaData = req.body;
      const result = await storage.createMediaFile(mediaData);
      res.json(result);
    } catch (error) {
      console.error('Error creating media file:', error);
      res.status(500).json({ message: 'Failed to create media file' });
    }
  });

  app.put('/api/admin/media/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await storage.updateMediaFile(parseInt(id), updateData);
      res.json(result);
    } catch (error) {
      console.error('Error updating media file:', error);
      res.status(500).json({ message: 'Failed to update media file' });
    }
  });

  app.delete('/api/admin/media/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMediaFile(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting media file:', error);
      res.status(500).json({ message: 'Failed to delete media file' });
    }
  });

  // Product Management
  app.get('/api/admin/products', async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  });

  app.post('/api/admin/products', async (req, res) => {
    try {
      const productData = req.body;
      const result = await storage.createProduct(productData);
      res.json(result);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Failed to create product' });
    }
  });

  app.put('/api/admin/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await storage.updateProduct(parseInt(id), updateData);
      res.json(result);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Failed to update product' });
    }
  });

  app.delete('/api/admin/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProduct(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Failed to delete product' });
    }
  });

  // Blog Management
  app.post('/api/admin/blog', async (req, res) => {
    try {
      const postData = req.body;
      const result = await storage.createBlogPost(postData);
      res.json(result);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ message: 'Failed to create blog post' });
    }
  });

  app.put('/api/admin/blog/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await storage.updateBlogPost(parseInt(id), updateData);
      res.json(result);
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({ message: 'Failed to update blog post' });
    }
  });

  app.delete('/api/admin/blog/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogPost(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  });

  // Enhanced feature admin endpoints
  app.get('/api/admin/inquiries', async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      res.status(500).json({ message: 'Failed to fetch inquiries' });
    }
  });

  app.get('/api/admin/appointments', async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Failed to fetch appointments' });
    }
  });

  app.get('/api/admin/reviews', async (req, res) => {
    try {
      const reviews = await storage.getCustomerReviews();
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Failed to fetch reviews' });
    }
  });

  app.get('/api/admin/quotes', async (req, res) => {
    try {
      const quotes = await storage.getQuoteRequests();
      res.json(quotes);
    } catch (error) {
      console.error('Error fetching quote requests:', error);
      res.status(500).json({ message: 'Failed to fetch quote requests' });
    }
  });

  app.get('/api/admin/calculations', async (req, res) => {
    try {
      const calculations = await storage.getPriceCalculations();
      res.json(calculations);
    } catch (error) {
      console.error('Error fetching price calculations:', error);
      res.status(500).json({ message: 'Failed to fetch price calculations' });
    }
  });
}
