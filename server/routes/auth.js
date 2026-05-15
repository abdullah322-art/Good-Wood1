import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../lib/prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'https://good-wood.servehumour.com/auth/google'
);

// Standard Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    let user = await prisma.users.findUnique({ where: { email } });
    
    // For development/initial setup
    if (!user && email === 'admin@goodwood.com') {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      user = await prisma.users.create({
        data: {
          name: 'Admin',
          email: 'admin@goodwood.com',
          password: hashedPassword,
          role: 'admin'
        }
      });
    }

    if (!user || !user.password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '2h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Google Auth URL
router.get('/google/url', (req, res) => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  });
  res.json({ url });
});

// Google Auth Callback
router.post('/google', async (req, res) => {
  try {
    const { code } = req.body;
    
    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Check if user exists
    let user = await prisma.users.findUnique({ where: { email } });
    
    // For this specific app, we might want only the owner to be admin.
    // If the email matches the owner's email, make them admin. Otherwise, user.
    // Assuming admin@goodwood.com is the owner, or if no users exist, the first one is admin.
    const userCount = await prisma.users.count();
    const role = (userCount === 0 || email === 'admin@goodwood.com') ? 'admin' : 'user';

    if (!user) {
      user = await prisma.users.create({
        data: {
          name,
          email,
          googleId,
          avatar: picture,
          role
        }
      });
    } else {
      // Update google info if changed
      user = await prisma.users.update({
        where: { id: user.id },
        data: { googleId, avatar: picture }
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Only admin can login to dashboard.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '2h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(400).json({ error: 'Authentication failed' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, avatar: true }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json(user);
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
});

export default router;
