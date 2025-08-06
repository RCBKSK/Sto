import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { users } from '@shared/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Check if user is authenticated
router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.id, req.session.userId));
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Authentication check error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set session
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.isAdmin = user.isAdmin;

    res.json({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

// Middleware to check if user is admin
export const requireAdmin = (req: any, res: any, next: any) => {
  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Middleware to check if user is authenticated
export const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};

export default router;