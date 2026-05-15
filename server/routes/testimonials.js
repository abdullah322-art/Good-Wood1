import express from 'express';
import prisma from '../lib/prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get visible testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonials.findMany({
      where: { visible: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Admin: Get all testimonials
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const testimonials = await prisma.testimonials.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Create testimonial (admin only or public if you prefer)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, content, rating, visible } = req.body;
    const testimonial = await prisma.testimonials.create({
      data: { name, content, rating, visible: visible !== undefined ? visible : true }
    });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// Update testimonial
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content, rating, visible } = req.body;
    const testimonial = await prisma.testimonials.update({
      where: { id: Number(id) },
      data: { name, content, rating, visible }
    });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// Delete testimonial
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.testimonials.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

export default router;
